;; Currently body expression in `defmacro` is evaluated in base Lisp
;; environment, so we don't have to have basic functions in our environment.
(defmacro let (pairs . body)
  `((lambda ,(map car pairs)
      ,@body)
    ,@(map cadr pairs)))

(defmacro cond clauses
  (if (null? clauses)
      '()
    (if (eq? (caar clauses) 'else)
        `(begin ,@(cdar clauses))
      `(if ,(caar clauses)
           (begin ,@(cdar clauses))
         (cond ,@(cdr clauses))))))

;;
(define (null? x)
  (eq? x nil))

(define (caar x)  (car (car x)))
(define (cadr x)  (car (cdr x)))
(define (cdar x)  (cdr (car x)))
(define (cddr x)  (cdr (cdr x)))

(define (member x ls)
  (cond ((null? ls) nil)
        ((eq? x (car ls)) ls)
        (else (member x (cdr ls)))))

(define (assoc x ls)
  (if (null? ls) #f
    (if (eq? x (caar ls)) (cdar ls)
      (assoc x (cdr ls)))))

(define (map f ls)
  (if (null? ls)
      '()
    (cons (f (car ls))
          (map f (cdr ls)))))