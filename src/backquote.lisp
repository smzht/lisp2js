
;; Reverse list and concatenate tail destructively.
(defun nreconc (ls tail)
  (let1 top (reverse! ls)
    (set-cdr! ls tail)
    top))

(defun any (f ls)
  (cond ((null? ls) nil)
        ((f (car ls)) t)
        (t (any f (cdr ls)))))

(defun every (f ls)
  (cond ((null? ls) t)
        ((f (car ls)) (every f (cdr ls)))
        (t nil)))

;;; http://www.cs.cmu.edu/Groups/AI/html/cltl/clm/node367.html

;;; Common Lisp backquote implementation, written in Common Lisp.
;;; Author: Guy L. Steele Jr.  Date: 27 December 1985
;;; Tested under Symbolics Common Lisp and Lucid Common Lisp.
;;; This software is in the public domain.

;;; $ is pseudo-backquote and % is pseudo-comma. This makes it
;;; possible to test this code without interfering with normal
;;; Common Lisp syntax.

;;; The following are unique tokens used during processing.
;;; They need not be symbols; they need not even be atoms.

(def *bq-clobberable* (gensym))
(def *bq-quote-nil* (list 'quote ()))

;;; Reader macro characters:
;;;   $foo is read in as (BACKQUOTE foo)
;;;   %foo is read in as (#:COMMA foo)
;;;   %@foo is read in as (#:COMMA-ATSIGN foo)
;;;   %.foo is read in as (#:COMMA-DOT foo)
;;; where #:COMMA is the value of the variable *COMMA*, etc.

;;; BACKQUOTE is an ordinary macro (not a read-macro) that
;;; processes the expression foo, looking for occurrences of
;;; #:COMMA, #:COMMA-ATSIGN, and #:COMMA-DOT. It constructs code
;;; in strict accordance with the rules on pages 349-350 of
;;; the first edition (pages 528-529 of this second edition).
;;; It then optionally applies a code simplifier.

;(set-macro-character #\`
;  (lambda (stream char)
;     ;(declare (ignore char))
;     (list 'quasiquote (read stream))))
;
;(set-macro-character #\,
;  (lambda (stream char)
;     ;(declare (ignore char))
;     (let1 c (read-char stream)
;       (case c
;         (#\@
;          (list 'unquote-splicing (read stream)))
;         (#\.
;          (list 'unquote-dot (read stream)))
;         (t (unread-char c stream)
;            (list 'unquote (read stream)))))))

;;; If the value of *BQ-SIMPLIFY* is non-NIL, then BACKQUOTE
;;; processing applies the code simplifier. If the value is NIL,
;;; then the code resulting from BACKQUOTE is exactly that
;;; specified by the official rules.

(defmacro quasiquote (x)
  (bq-completely-process x))

;;; Backquote processing proceeds in three stages:
;;;
;;; (1) BQ-PROCESS applies the rules to remove occurrences of
;;; #:COMMA, #:COMMA-ATSIGN, and #:COMMA-DOT corresponding to
;;; this level of BACKQUOTE. (It also causes embedded calls to
;;; BACKQUOTE to be expanded so that nesting is properly handled.)
;;; Code is produced that is expressed in terms of functions
;;; #:BQ-LIST, #:BQ-APPEND, and #:BQ-CLOBBERABLE. This is done
;;; so that the simplifier will simplify only list construction
;;; functions actually generated by BACKQUOTE and will not involve
;;; any user code in the simplification. #:BQ-LIST means LIST,
;;; #:BQ-APPEND means APPEND, and #:BQ-CLOBBERABLE means IDENTITY
;;; but indicates places where "%." was used and where NCONC may
;;; therefore be introduced by the simplifier for efficiency.
;;;
;;; (2) BQ-SIMPLIFY, if used, rewrites the code produced by
;;; BQ-PROCESS to produce equivalent but faster code. The
;;; additional functions #:BQ-LIST* and #:BQ-NCONC may be
;;; introduced into the code.
;;;
;;; (3) BQ-REMOVE-TOKENS goes through the code and replaces
;;; #:BQ-LIST with LIST, #:BQ-APPEND with APPEND, and so on.
;;; #:BQ-CLOBBERABLE is simply eliminated (a call to it being
;;; replaced by its argument). #:BQ-LIST* is replaced by either
;;; LIST* or CONS (the latter is used in the two-argument case,
;;; purely to make the resulting code a tad more readable).

(defun bq-completely-process (x)
  (bq-simplify (bq-process x)))

(defun bq-process (x)
  (cond ((not (pair? x))
         (list 'quote x))
        ((eq? (car x) 'quasiquote)
         (bq-process (bq-completely-process (cadr x))))
        ((eq? (car x) 'unquote) (cadr x))
        ((eq? (car x) 'unquote-splicing)
         (error ",@~S after `" (cadr x)))
        ((eq? (car x) 'unquote-dot)
         (error ",.~S after `" (cadr x)))
        (t (let loop ((p x)
                      (q ()))
                (if (not (pair? p))
                    (cons 'append
                          (nreconc q (list (list 'quote p))))
                  (if (eq? (car p) 'unquote)
                      (progn (unless (null? (cddr p)) (error "Malformed ,~S" p))
                             (cons 'append
                                   (nreconc q (list (cadr p)))))
                    (progn (when (eq? (car p) 'unquote-splicing)
                             (error "Dotted ,@~S" p))
                           (when (eq? (car p) 'unquote-dot)
                             (error "Dotted ,.~S" p))
                           (loop (cdr p)
                                 (cons (bracket (car p)) q)))))))))

;;; This implements the bracket operator of the formal rules.

(defun bracket (x)
  (cond ((not (pair? x))
         (list 'list (bq-process x)))
        ((eq? (car x) 'unquote)
         (list 'list (cadr x)))
        ((eq? (car x) 'unquote-splicing)
         (cadr x))
        ((eq? (car x) 'unquote-dot)
         (list *bq-clobberable* (cadr x)))
        (t (list 'list (bq-process x)))))

;;; This auxiliary function is like MAPCAR but has two extra
;;; purposes: (1) it handles dotted lists; (2) it tries to make
;;; the result share with the argument x as much as possible.

(defun maptree (fn x)
  (if (not (pair? x))
      (fn x)
    (let ((a (fn (car x)))
          (d (maptree fn (cdr x))))
      (if (and (equal? a (car x)) (equal? d (cdr x)))
          x
        (cons a d)))))

;;; This predicate is true of a form that when read looked
;;; like %@foo or %.foo.

(defun bq-splicing-frob (x)
  (and (pair? x)
       (or (eq? (car x) 'unquote-splicing)
           (eq? (car x) 'unquote-dot))))

;;; This predicate is true of a form that when read
;;; loocked like %@foo or %.foo or just place %foo.

(defun bq-frob (x)
  (and (pair? x)
       (or (eq? (car x) 'unquote)
           (eq? (car x) 'unquote-splicing)
           (eq? (car x) 'unquote-dot))))

;;; The simplifier essentially looks for calls to #:BQ-APPEND and
;;; tries to simplify them. The arguments to #:BQ-APPEND are
;;; processed from right to left, building up a replacement form.
;;; At each step a number of special cases are handled that,
;;; loosely speaking, look like this:
;;;
;;; (APPEND (LIST a b c) foo) U> (LIST* a b c foo)
;;;     provided a, b, c are not splicing frobs
;;; (APPEND (LIST* a b c) foo) U> (LIST* a b (APPEND c foo))
;;;     provided a, b, c are not splicing frobs
;;; (APPEND (QUOTE (x)) foo) U> (LIST* (QUOTE x) foo)
;;; (APPEND (CLOBBERABLE x) foo) U> (NCONC x foo)

(defun bq-simplify (x)
  (if (pair? x)
      (let ((x (if (eq? (car x) 'quote)
                   x
                 (maptree bq-simplify x))))
        (if (not (eq? (car x) 'append))
            x
          (bq-simplify-args x)))
    x))

(defun bq-simplify-args (x)
  (let loop ((args (reverse (cdr x)))
             (result ()))
    (if (not (null? args))
        (loop (cdr args)
              (cond ((not (pair? (car args)))
                     (bq-attach-append 'append (car args) result))
                    ((and (eq? (caar args) 'list)
                          (not (any bq-splicing-frob (cdar args))))
                     (bq-attach-conses (cdar args) result))
                    ((and (eq? (caar args) 'list*)
                          (not (any bq-splicing-frob (cdar args))))
                     (bq-attach-conses
                      (reverse (cdr (reverse (cdar args))))
                      (bq-attach-append 'append
                                        (car (last (car args)))
                                        result)))
                    ((and (eq? (caar args) 'quote)
                          (pair? (cadar args))
                          (not (bq-frob (cadar args)))
                          (not (cddar args)))
                     (bq-attach-conses (list (list 'quote
                                                   (caadar args)))
                                       result))
                    ((eq? (caar args) *bq-clobberable*)
                     (bq-attach-append 'append! (cadar args) result))
                    (t (bq-attach-append 'append
                                         (car args)
                                         result))))
      result)))

(defun null-or-quoted (x)
  (or (null? x) (and (pair? x) (eq? (car x) 'quote))))

;;; When BQ-ATTACH-APPEND is called, the OP should be #:BQ-APPEND
;;; or #:BQ-NCONC. This produces a form (op item result) but
;;; some simplifications are done on the fly:
;;;
;;; (op '(a b c) '(d e f g)) U> '(a b c d e f g)
;;; (op item 'nil) U> item, provided item is not a splicable frob
;;; (op item ’nil) U>(op item), if item is a splicable frob
;;; (op item (op a b c)) U> (op item a b c)

(defun bq-attach-append (op item result)
  (cond ((and (null-or-quoted item) (null-or-quoted result))
         (list 'quote (append (cadr item) (cadr result))))
        ((or (null? result) (equal? result *bq-quote-nil*))
         (if (bq-splicing-frob item) (list op item) item))
        ((and (pair? result) (eq? (car result) op))
         (list* (car result) item (cdr result)))
        (t (list op item result))))

;;; The effect of BQ-ATTACH-CONSES is to produce a form as if by
;;; `(LIST* ,@items ,result) but some simplifications are done
;;; on the fly.
;;;
;;; (LIST* 'a 'b 'c 'd) U> '(a b c . d)
;;; (LIST* a b c 'nil) U> (LIST a b c)
;;; (LIST* a b c (list* d e f g)) U> (LIST* a b c d e f g)
;;; (LIST* a b c (list d e f g)) U> (LIST a b c d e f g)

(defun bq-attach-conses (items result)
  (cond ((and (every null-or-quoted items)
              (null-or-quoted result))
         (list 'quote
               (append (map cadr items) (cadr result))))
        ((or (null? result) (equal? result *bq-quote-nil*))
         (cons 'list items))
        ((and (pair? result)
              (or (eq? (car result) 'list)
                  (eq? (car result) 'list*)))
         (cons (car result) (append items (cdr result))))
        (t (cons 'list* (append items (list result))))))
