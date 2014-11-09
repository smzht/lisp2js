(define (expand-args args env)
  (string-join (map (lambda (x) (compile* x env))
                    args)
               ", "))

(define (expand-body body env)
  (if (null? body)
      "LISP.nil"
    (expand-args body env)))

(define (escape-char c)
  (cond ((string=? c "\\") "\\\\")
        ((string=? c "\t") "\\t")
        ((string=? c "\n") "\\n")
        ((string=? c "\"") "\\\"")
        (else c)))

(define (escape-string s)
  (regexp-replace-all #/[\\\t\n"]/ s
                      (lambda (m) (escape-char (m)))))

(define (escape-symbol sym)
  (define (escape-sym-char c)
    (string-append "$"
                   (integer->hex-string (char->integer c) "00")))
  (define (integer->hex-string x padding)
    (let* ((s (string-append padding
                             (number->string x 16)))
           (sl (string-length s))
           (pl (string-length padding)))
      (substring s (- sl pl) sl)))
  (regexp-replace-all #/[^0-9A-Za-z_]/ (symbol->string sym)
                      (lambda (m) (escape-sym-char (string-ref (m) 0)))))

(define (compile-symbol sym env)
  (define (local-var? sym env)
    (member sym env))
  (if (local-var? sym env)
      (escape-symbol sym)
    (let ((s (symbol->string sym)))
      (if (rxmatch #/^[0-9A-Za-z_]*$/ s)
          (string-append "LISP."
                         s)
        (string-append "LISP[\""
                       (escape-string s)
                       "\"]")))))

(define (compile-string str)
  (string-append "\""
                 (escape-string str)
                 "\""))

(define (compile-regexp regex)
  (string-append "/"
                 (regexp->string regex)
                 "/"))

(define (compile-literal s env)
  (cond ((number? s) (number->string s))
        ((symbol? s) (compile-symbol s env))
        ((string? s) (compile-string s))
        ((regexp? s) (compile-regexp s))
        ((null? s)   "LISP.nil")
        ((eq? s #t)  "LISP.t")
        ((eq? s #f)  "LISP.nil")
        (else (error (string-append "compile-literal: [" s "]")))))

(define (compile-funcall s env)
  (let ((fn (car s))
        (args (cdr s)))
    (string-append (compile* fn env)
                   "("
                   (expand-args args env)
                   ")")))

(define (compile-quote s env)
  (let ((x (car s)))
    (if (pair? x)
        (compile* `(cons ',(car x)
                         ',(cdr x))
                  env)
      (if (symbol? x)
          (string-append "LISP.intern(\""
                         (escape-string (symbol->string x))
                         "\")")
        (compile-literal x env)))))

(define (compile-if s env)
  (let ((p (car s))
        (then-node (cadr s))
        (else? (cddr s)))
    (string-append "(("
                   (compile* p env)
                   ") !== LISP.nil ? ("
                   (compile* then-node env)
                   ") : ("
                   (if (null? else?)
                       "LISP.nil"
                     (compile* (car else?) env))
                   "))")))

(define (compile-set! s env)
  (let ((sym (car s))
        (val (cadr s)))
    (string-append (compile* sym env)
                   " = "
                   (compile* val env))))

(define (compile-lambda s env)
  (define (extend-env env params)
    (append params env))
  (let ((raw-params (car s))
        (bodies (cdr s)))
    (let ((params (if (proper-list? raw-params)
                      raw-params
                    (reverse! (reverse raw-params))))  ; Remove dotted part.
          (rest (if (pair? raw-params)
                    (cdr (last-pair raw-params))
                  raw-params)))
      (let1 newenv (extend-env env (if (null? rest)
                                       params
                                     (append (list rest)
                                             params)))
        (string-append "(function("
                       (expand-args params newenv)
                       "){"
                       (if (null? rest)
                           ""
                         (string-append "var "
                                        (symbol->string rest)
                                        " = LISP._getRestArgs(arguments, "
                                        (number->string (length params))
                                        "); "))
                       "return ("
                       (expand-body bodies newenv)
                       ");})")))))

(define (compile-define s env)
  (let ((name (car s))
        (body (cdr s)))
    (if (pair? name)
        ;; Convert (define (foo args...) ...) => (define foo (lambda (args...) ...))
        (compile* `(define ,(car name)
                     (lambda ,(cdr name) ,@body))
                  env)
      (string-append (compile-symbol name env)
                     " = "
                     (compile* (car body) env)))))

(define (compile-defmacro s env)
  (let ((name (caar s))
        (params (cdar s))
        (body (cdr s)))
    (let ((exp (list* 'lambda params body)))
      (do-compile-defmacro name exp))))

(define (macroexpand exp)
  (let ((expanded (macroexpand-1 exp)))
    (if (equal? expanded exp)
        exp
      (macroexpand expanded))))

(define *special-forms*
  `((quote . ,compile-quote)
    (if . ,compile-if)
    (set! . ,compile-set!)
    (lambda . ,compile-lambda)
    (define . ,compile-define)
    (define-macro . ,compile-defmacro)
    ))

(define (special-form? s)
  (aif (assoc (car s) *special-forms*)
       (cdr it)
    #f))

(define (compile* s env)
  (let ((expanded (macroexpand s)))
    (if (eq? expanded s)
        (if (pair? s)
            (aif (special-form? s)
                 (it (cdr s) env)
              (compile-funcall (macroexpand s) env))
          (compile-literal s env))
      (compile* expanded env))))

(define (compile s)
  (compile* s '()))
