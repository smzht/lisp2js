#!/bin/bash

################################################################
# Test framework.

function error_exit() {
  echo -n -e "\033[1;31m[ERROR]\033[0;39m "
  echo "$1"
  exit 1
}

function run() {
  run_raw "$1" "$2" "(print $3)"
}

function run_raw() {
  echo -n "Testing $1 ... "
  echo "$3" | gosh lisp2js.scm > compiled-result.js
  result=$(cat lisp.js compiled-result.js | node)
  code=$?
  if [ $code -ne 0 ]; then
    error_exit "exit status is not 0 [$code]"
  fi
  if [ "$result" != "$2" ]; then
    error_exit "$2 expected, but got '$result'"
  fi
  rm compiled-result.js
  echo ok
}

################################################################
# Test cases.

run integer 123 '123'
run quote 123 '(quote 123)'
run cons '(1 . 2)' '(cons 1 2)'
run car 1 "(car '(1 . 2))"
run cdr 2 "(cdr '(1 . 2))"
run if-true 2 "(if 1 2 3)"
run if-false 3 "(if nil 2 3)"
run if-false2 nil "(if nil 2)"
run lambda 2222 '((lambda (x) (+ x x)) 1111)'
run nested-lambda 3 '(((lambda (x) (lambda (y) (+ x y))) 1) 2)'
run_raw define 123 "(define x 123)
                    (print x)"
run_raw define-lambda 2222 "(define (double x) (+ x x))
                            (print (double 1111))"
run + 6 '(+ 1 2 3)'

################################################################
# All tests succeeded.

echo -n -e "\033[1;32mVM-TEST ALL SUCCEEDED!\033[0;39m\n"
