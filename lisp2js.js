// DO NOT EDIT, this file is generated from src/*.scm
((LISP["*run-on-js*"]) !== LISP.nil ? (LISP['register-macro'](LISP.intern("quasiquote"), (function(x){return (LISP["bq-completely-process"](x));}))) : (LISP.nil));
LISP['register-macro'](LISP.intern("let"), (function(pairs){var body = LISP._getRestArgs(arguments, 1); return (((LISP["symbol?"](pairs)) !== LISP.nil ? ((function(name, pairs, body){return (LISP["list*"](LISP.list(LISP.intern("lambda"), LISP.list(name), LISP.list(LISP.intern("set!"), name, LISP["list*"](LISP.intern("lambda"), LISP.map(LISP.car, pairs), body)), LISP["list*"](name, LISP.map(LISP.cadr, pairs))), LISP.cons(LISP.intern("nil"), LISP.nil)));})(pairs, LISP.car(body), LISP.cdr(body))) : (LISP["list*"](LISP["list*"](LISP.intern("lambda"), LISP.map(LISP.car, pairs), body), LISP.map(LISP.cadr, pairs)))));}));
LISP['register-macro'](LISP.intern("let1"), (function(name, value){var body = LISP._getRestArgs(arguments, 2); return (LISP.list(LISP["list*"](LISP.intern("lambda"), LISP.list(name), body), value));}));
LISP['register-macro'](LISP.intern("let*"), (function(pairs){var body = LISP._getRestArgs(arguments, 1); return (((LISP["null?"](pairs)) !== LISP.nil ? (LISP["list*"](LISP.intern("begin"), body)) : (LISP.list(LISP.intern("let1"), LISP.caar(pairs), LISP.cadar(pairs), LISP["list*"](LISP.intern("let*"), LISP.cdr(pairs), body)))));}));
LISP['register-macro'](LISP.intern("when"), (function(pred){var body = LISP._getRestArgs(arguments, 1); return (LISP.list(LISP.intern("if"), pred, LISP["list*"](LISP.intern("begin"), body)));}));
LISP['register-macro'](LISP.intern("unless"), (function(pred){var body = LISP._getRestArgs(arguments, 1); return (LISP.list(LISP.intern("if"), pred, LISP.intern("nil"), LISP["list*"](LISP.intern("begin"), body)));}));
LISP['register-macro'](LISP.intern("cond"), (function(){var clauses = LISP._getRestArgs(arguments, 0); return (((LISP["null?"](clauses)) !== LISP.nil ? (LISP.nil) : ((function(clause, rest){return (((LISP["eq?"](LISP.car(clause), LISP.intern("else"))) !== LISP.nil ? (LISP["list*"](LISP.intern("begin"), LISP.cdr(clause))) : (((LISP["null?"](LISP.cdr(clause))) !== LISP.nil ? ((function(g){return (LISP.list(LISP.intern("let"), LISP.list(LISP.list(g, LISP.car(clause))), LISP.list(LISP.intern("if"), g, g, LISP["list*"](LISP.intern("cond"), rest))));})(LISP.gensym())) : (((LISP["eq?"](LISP.cadr(clause), LISP.intern("=>"))) !== LISP.nil ? ((function(g){return (LISP.list(LISP.intern("let"), LISP.list(LISP.list(g, LISP.car(clause))), LISP.list(LISP.intern("if"), g, LISP.list(LISP.caddr(clause), g), LISP["list*"](LISP.intern("cond"), rest))));})(LISP.gensym())) : (LISP.list(LISP.intern("if"), LISP.car(clause), LISP["list*"](LISP.intern("begin"), LISP.cdr(clause)), LISP["list*"](LISP.intern("cond"), rest)))))))));})(LISP.car(clauses), LISP.cdr(clauses)))));}));
LISP['register-macro'](LISP.intern("and"), (function(){var args = LISP._getRestArgs(arguments, 0); return (((LISP["null?"](args)) !== LISP.nil ? (LISP.intern("t")) : (((LISP["null?"](LISP.cdr(args))) !== LISP.nil ? (LISP.car(args)) : (LISP["list*"](LISP.intern("if"), LISP.car(args), LISP["list*"](LISP.intern("and"), LISP.cdr(args)), LISP.cons(LISP.intern("nil"), LISP.nil)))))));}));
LISP['register-macro'](LISP.intern("or"), (function(){var args = LISP._getRestArgs(arguments, 0); return (((LISP.not(LISP["null?"](args))) !== LISP.nil ? ((function(g){return (LISP.list(LISP.intern("let1"), g, LISP.car(args), LISP.list(LISP.intern("if"), g, g, LISP["list*"](LISP.intern("or"), LISP.cdr(args)))));})(LISP.gensym())) : (LISP.nil)));}));
LISP['register-macro'](LISP.intern("begin"), (function(){var body = LISP._getRestArgs(arguments, 0); return (((LISP["null?"](body)) !== LISP.nil ? (LISP.nil) : (((LISP["null?"](LISP.cdr(body))) !== LISP.nil ? (LISP.car(body)) : (LISP["list*"](LISP.intern("let"), LISP.nil, body))))));}));
LISP["null?"] = (function(x){return (LISP["eq?"](x, LISP.nil));});
LISP.not = (function(x){return (LISP["eq?"](x, LISP.nil));});
LISP.caar = (function(x){return (LISP.car(LISP.car(x)));});
LISP.cadr = (function(x){return (LISP.car(LISP.cdr(x)));});
LISP.cdar = (function(x){return (LISP.cdr(LISP.car(x)));});
LISP.cddr = (function(x){return (LISP.cdr(LISP.cdr(x)));});
LISP.cadar = (function(x){return (LISP.cadr(LISP.car(x)));});
LISP.caddr = (function(x){return (LISP.car(LISP.cddr(x)));});
LISP.cdddr = (function(x){return (LISP.cdr(LISP.cddr(x)));});
LISP["equal?"] = (function(x, y){return (((LISP["eq?"](x, y)) !== LISP.nil ? (LISP.t) : (((LISP["pair?"](x)) !== LISP.nil ? (((LISP["pair?"](y)) !== LISP.nil ? (((LISP["equal?"](LISP.car(x), LISP.car(y))) !== LISP.nil ? (LISP["equal?"](LISP.cdr(x), LISP.cdr(y))) : (LISP.nil))) : (LISP.nil))) : (LISP.nil)))));});
LISP.length = (function(ls){return ((function(loop){return (loop = (function(ls, acc){return (((LISP["pair?"](ls)) !== LISP.nil ? (loop(LISP.cdr(ls), LISP["+"](acc, 1))) : (acc)));}), loop(ls, 0));})(LISP.nil));});
LISP["last-pair"] = (function(ls){return (((LISP["pair?"](LISP.cdr(ls))) !== LISP.nil ? (LISP["last-pair"](LISP.cdr(ls))) : (ls)));});
LISP["proper-list?"] = (function(ls){return (((LISP["pair?"](ls)) !== LISP.nil ? (LISP["null?"](LISP.cdr(LISP["last-pair"](ls)))) : (LISP.nil)));});
LISP.member = (function(x, ls){return (((LISP["null?"](ls)) !== LISP.nil ? (LISP.nil) : (((LISP["eq?"](x, LISP.car(ls))) !== LISP.nil ? (ls) : (LISP.member(x, LISP.cdr(ls)))))));});
LISP.assoc = (function(x, ls){return (((LISP["null?"](ls)) !== LISP.nil ? (LISP.nil) : (((LISP["eq?"](x, LISP.caar(ls))) !== LISP.nil ? (LISP.car(ls)) : (LISP.assoc(x, LISP.cdr(ls)))))));});
LISP.map = (function(f, ls){return (((LISP["null?"](ls)) !== LISP.nil ? (LISP.nil) : (LISP.cons(f(LISP.car(ls)), LISP.map(f, LISP.cdr(ls))))));});
LISP.append = (function(ls){var rest = LISP._getRestArgs(arguments, 1); return (((LISP["null?"](rest)) !== LISP.nil ? (ls) : (((LISP["null?"](ls)) !== LISP.nil ? (LISP.apply(LISP.append, rest)) : (LISP.cons(LISP.car(ls), LISP.apply(LISP.append, LISP.cdr(ls), rest)))))));});
LISP.reverse = (function(ls){return ((function(loop){return (loop = (function(ls, acc){return (((LISP["pair?"](ls)) !== LISP.nil ? (loop(LISP.cdr(ls), LISP.cons(LISP.car(ls), acc))) : (acc)));}), loop(ls, LISP.nil));})(LISP.nil));});
LISP["list*"] = (function(){var args = LISP._getRestArgs(arguments, 0); return (((LISP["null?"](args)) !== LISP.nil ? (LISP.nil) : (((LISP["null?"](LISP.cdr(args))) !== LISP.nil ? (LISP.car(args)) : ((function(loop){return (loop = (function(p, q){return (((LISP["null?"](LISP.cdr(q))) !== LISP.nil ? ((function(){return (LISP["set-cdr!"](p, LISP.car(q)), args);})()) : (loop(q, LISP.cdr(q)))));}), loop(args, LISP.cdr(args)));})(LISP.nil))))));});
LISP.nreconc = (function(ls, tail){return ((function(top){return (LISP["set-cdr!"](ls, tail), top);})(LISP["reverse!"](ls)));});
LISP["safe-car"] = (function(x){return (((LISP["null?"](x)) !== LISP.nil ? (LISP.nil) : (LISP.car(x))));});
LISP["safe-cdr"] = (function(x){return (((LISP["null?"](x)) !== LISP.nil ? (LISP.nil) : (LISP.cdr(x))));});
LISP["safe-cadr"] = (function(x){return (LISP["safe-car"](LISP["safe-cdr"](x)));});
LISP.any = (function(f, ls){return (((LISP["null?"](ls)) !== LISP.nil ? (LISP.nil) : (((f(LISP.car(ls))) !== LISP.nil ? (LISP.t) : (LISP.any(f, LISP.cdr(ls)))))));});
LISP.every = (function(f, ls){return (((LISP["null?"](ls)) !== LISP.nil ? (LISP.t) : (((f(LISP.car(ls))) !== LISP.nil ? (LISP.every(f, LISP.cdr(ls))) : (LISP.nil)))));});
LISP["*bq-clobberable*"] = LISP.gensym();
LISP["*bq-quote-nil*"] = LISP.list(LISP.intern("quote"), LISP.nil);
LISP['register-macro'](LISP.intern("quasiquote"), (function(x){return (LISP["bq-completely-process"](x));}));
LISP["bq-completely-process"] = (function(x){return (LISP["bq-simplify"](LISP["bq-process"](x)));});
LISP["bq-process"] = (function(x){return (((LISP.not(LISP["pair?"](x))) !== LISP.nil ? (LISP.list(LISP.intern("quote"), x)) : (((LISP["eq?"](LISP.car(x), LISP.intern("quasiquote"))) !== LISP.nil ? (LISP["bq-process"](LISP["bq-completely-process"](LISP.cadr(x)))) : (((LISP["eq?"](LISP.car(x), LISP.intern("unquote"))) !== LISP.nil ? (LISP.cadr(x)) : (((LISP["eq?"](LISP.car(x), LISP.intern("unquote-splicing"))) !== LISP.nil ? (LISP.error(",@~S after `", LISP.cadr(x))) : (((LISP["eq?"](LISP.car(x), LISP.intern("unquote-dot"))) !== LISP.nil ? (LISP.error(",.~S after `", LISP.cadr(x))) : ((function(loop){return (loop = (function(p, q){return (((LISP.not(LISP["pair?"](p))) !== LISP.nil ? (LISP.cons(LISP.intern("append"), LISP.nreconc(q, LISP.list(LISP.list(LISP.intern("quote"), p))))) : (((LISP["eq?"](LISP.car(p), LISP.intern("unquote"))) !== LISP.nil ? ((function(){return (((LISP["null?"](LISP.cddr(p))) !== LISP.nil ? (LISP.nil) : (LISP.error("Malformed ,~S", p))), LISP.cons(LISP.intern("append"), LISP.nreconc(q, LISP.list(LISP.cadr(p)))));})()) : ((function(){return (((LISP["eq?"](LISP.car(p), LISP.intern("unquote-splicing"))) !== LISP.nil ? (LISP.error("Dotted ,@~S", p)) : (LISP.nil)), ((LISP["eq?"](LISP.car(p), LISP.intern("unquote-dot"))) !== LISP.nil ? (LISP.error("Dotted ,.~S", p)) : (LISP.nil)), loop(LISP.cdr(p), LISP.cons(LISP.bracket(LISP.car(p)), q)));})())))));}), loop(x, LISP.nil));})(LISP.nil))))))))))));});
LISP.bracket = (function(x){return (((LISP.not(LISP["pair?"](x))) !== LISP.nil ? (LISP.list(LISP.intern("list"), LISP["bq-process"](x))) : (((LISP["eq?"](LISP.car(x), LISP.intern("unquote"))) !== LISP.nil ? (LISP.list(LISP.intern("list"), LISP.cadr(x))) : (((LISP["eq?"](LISP.car(x), LISP.intern("unquote-splicing"))) !== LISP.nil ? (LISP.cadr(x)) : (((LISP["eq?"](LISP.car(x), LISP.intern("unquote-dot"))) !== LISP.nil ? (LISP.list(LISP["*bq-clobberable*"], LISP.cadr(x))) : (LISP.list(LISP.intern("list"), LISP["bq-process"](x)))))))))));});
LISP.maptree = (function(fn, x){return (((LISP.not(LISP["pair?"](x))) !== LISP.nil ? (fn(x)) : ((function(a, d){return (((((LISP["equal?"](a, LISP.car(x))) !== LISP.nil ? (LISP["equal?"](d, LISP.cdr(x))) : (LISP.nil))) !== LISP.nil ? (x) : (LISP.cons(a, d))));})(fn(LISP.car(x)), LISP.maptree(fn, LISP.cdr(x))))));});
LISP["bq-splicing-frob"] = (function(x){return (((LISP["pair?"](x)) !== LISP.nil ? ((function(__3){return (((__3) !== LISP.nil ? (__3) : ((function(__4){return (((__4) !== LISP.nil ? (__4) : (LISP.nil)));})(LISP["eq?"](LISP.car(x), LISP.intern("unquote-dot"))))));})(LISP["eq?"](LISP.car(x), LISP.intern("unquote-splicing")))) : (LISP.nil)));});
LISP["bq-frob"] = (function(x){return (((LISP["pair?"](x)) !== LISP.nil ? ((function(__5){return (((__5) !== LISP.nil ? (__5) : ((function(__6){return (((__6) !== LISP.nil ? (__6) : ((function(__7){return (((__7) !== LISP.nil ? (__7) : (LISP.nil)));})(LISP["eq?"](LISP.car(x), LISP.intern("unquote-dot"))))));})(LISP["eq?"](LISP.car(x), LISP.intern("unquote-splicing"))))));})(LISP["eq?"](LISP.car(x), LISP.intern("unquote")))) : (LISP.nil)));});
LISP["bq-simplify"] = (function(x){return (((LISP["pair?"](x)) !== LISP.nil ? ((function(x){return (((LISP.not(LISP["eq?"](LISP.car(x), LISP.intern("append")))) !== LISP.nil ? (x) : (LISP["bq-simplify-args"](x))));})(((LISP["eq?"](LISP.car(x), LISP.intern("quote"))) !== LISP.nil ? (x) : (LISP.maptree(LISP["bq-simplify"], x))))) : (x)));});
LISP["bq-simplify-args"] = (function(x){return ((function(loop){return (loop = (function(args, result){return (((LISP.not(LISP["null?"](args))) !== LISP.nil ? (loop(LISP.cdr(args), ((LISP.not(LISP["pair?"](LISP.car(args)))) !== LISP.nil ? (LISP["bq-attach-append"](LISP.intern("append"), LISP.car(args), result)) : (((((LISP["eq?"](LISP.caar(args), LISP.intern("list"))) !== LISP.nil ? (LISP.not(LISP.any(LISP["bq-splicing-frob"], LISP.cdar(args)))) : (LISP.nil))) !== LISP.nil ? (LISP["bq-attach-conses"](LISP.cdar(args), result)) : (((((LISP["eq?"](LISP.caar(args), LISP.intern("list*"))) !== LISP.nil ? (LISP.not(LISP.any(LISP["bq-splicing-frob"], LISP.cdar(args)))) : (LISP.nil))) !== LISP.nil ? (LISP["bq-attach-conses"](LISP.reverse(LISP.cdr(LISP.reverse(LISP.cdar(args)))), LISP["bq-attach-append"](LISP.intern("append"), LISP.car(LISP.last(LISP.car(args))), result))) : (((((LISP["eq?"](LISP.caar(args), LISP.intern("quote"))) !== LISP.nil ? (((LISP["pair?"](LISP.cadar(args))) !== LISP.nil ? (((LISP.not(LISP["bq-frob"](LISP.cadar(args)))) !== LISP.nil ? (LISP.not(LISP.cddar(args))) : (LISP.nil))) : (LISP.nil))) : (LISP.nil))) !== LISP.nil ? (LISP["bq-attach-conses"](LISP.list(LISP.list(LISP.intern("quote"), LISP.caadar(args))), result)) : (((LISP["eq?"](LISP.caar(args), LISP["*bq-clobberable*"])) !== LISP.nil ? (LISP["bq-attach-append"](LISP.intern("append!"), LISP.cadar(args), result)) : (LISP["bq-attach-append"](LISP.intern("append"), LISP.car(args), result))))))))))))) : (result)));}), loop(LISP.reverse(LISP.cdr(x)), LISP.nil));})(LISP.nil));});
LISP["null-or-quoted"] = (function(x){return ((function(__8){return (((__8) !== LISP.nil ? (__8) : ((function(__9){return (((__9) !== LISP.nil ? (__9) : (LISP.nil)));})(((LISP["pair?"](x)) !== LISP.nil ? (LISP["eq?"](LISP.car(x), LISP.intern("quote"))) : (LISP.nil))))));})(LISP["null?"](x)));});
LISP["bq-attach-append"] = (function(op, item, result){return (((((LISP["null-or-quoted"](item)) !== LISP.nil ? (LISP["null-or-quoted"](result)) : (LISP.nil))) !== LISP.nil ? (LISP.list(LISP.intern("quote"), LISP.append(LISP["safe-cadr"](item), LISP["safe-cadr"](result)))) : ((((function(__10){return (((__10) !== LISP.nil ? (__10) : ((function(__11){return (((__11) !== LISP.nil ? (__11) : (LISP.nil)));})(LISP["equal?"](result, LISP["*bq-quote-nil*"])))));})(LISP["null?"](result))) !== LISP.nil ? (((LISP["bq-splicing-frob"](item)) !== LISP.nil ? (LISP.list(op, item)) : (item))) : (((((LISP["pair?"](result)) !== LISP.nil ? (LISP["eq?"](LISP.car(result), op)) : (LISP.nil))) !== LISP.nil ? (LISP["list*"](LISP.car(result), item, LISP.cdr(result))) : (LISP.list(op, item, result))))))));});
LISP["bq-attach-conses"] = (function(items, result){return (((((LISP.every(LISP["null-or-quoted"], items)) !== LISP.nil ? (LISP["null-or-quoted"](result)) : (LISP.nil))) !== LISP.nil ? (LISP.list(LISP.intern("quote"), LISP.append(LISP.map(LISP.cadr, items), LISP.cadr(result)))) : ((((function(__12){return (((__12) !== LISP.nil ? (__12) : ((function(__13){return (((__13) !== LISP.nil ? (__13) : (LISP.nil)));})(LISP["equal?"](result, LISP["*bq-quote-nil*"])))));})(LISP["null?"](result))) !== LISP.nil ? (LISP.cons(LISP.intern("list"), items)) : (((((LISP["pair?"](result)) !== LISP.nil ? ((function(__14){return (((__14) !== LISP.nil ? (__14) : ((function(__15){return (((__15) !== LISP.nil ? (__15) : (LISP.nil)));})(LISP["eq?"](LISP.car(result), LISP.intern("list*"))))));})(LISP["eq?"](LISP.car(result), LISP.intern("list")))) : (LISP.nil))) !== LISP.nil ? (LISP.cons(LISP.car(result), LISP.append(items, LISP.cdr(result)))) : (LISP.cons(LISP.intern("list*"), LISP.append(items, LISP.list(result))))))))));});
LISP["expand-args"] = (function(args, env){return (LISP["string-join"](LISP.map((function(x){return (LISP["compile*"](x, env));}), args), ", "));});
LISP["expand-body"] = (function(body, env){return (((LISP["null?"](body)) !== LISP.nil ? ("LISP.nil") : (LISP["expand-args"](body, env))));});
LISP["escape-char"] = (function(c){return (((LISP["string=?"](c, "\\")) !== LISP.nil ? ("\\\\") : (((LISP["string=?"](c, "\t")) !== LISP.nil ? ("\\t") : (((LISP["string=?"](c, "\n")) !== LISP.nil ? ("\\n") : (((LISP["string=?"](c, "\"")) !== LISP.nil ? ("\\\"") : (c)))))))));});
LISP["escape-string"] = (function(s){return (LISP["regexp-replace-all"](/[\\\t\n"]/, s, (function(m){return (LISP["escape-char"](m()));})));});
LISP["escape-symbol"] = (function(sym){return (LISP["escape-sym-char"] = (function(c){return (LISP["string-append"]("$", LISP["integer->hex-string"](LISP["char->integer"](c), "00")));}), LISP["integer->hex-string"] = (function(x, padding){return ((function(s){return ((function(sl){return ((function(pl){return (LISP.substring(s, LISP["-"](sl, pl), sl));})(LISP["string-length"](padding)));})(LISP["string-length"](s)));})(LISP["string-append"](padding, LISP["number->string"](x, 16))));}), LISP["regexp-replace-all"](/[^0-9A-Za-z_]/, LISP["symbol->string"](sym), (function(m){return (LISP["escape-sym-char"](LISP["string-ref"](m(), 0)));})));});
LISP["compile-symbol"] = (function(sym, env){return (LISP["local-var?"] = (function(sym, env){return (LISP.member(sym, env));}), ((LISP["local-var?"](sym, env)) !== LISP.nil ? (LISP["escape-symbol"](sym)) : ((function(s){return (((LISP.rxmatch(/^[0-9A-Za-z_]*$/, s)) !== LISP.nil ? (LISP["string-append"]("LISP.", s)) : (LISP["string-append"]("LISP[\"", LISP["escape-string"](s), "\"]"))));})(LISP["symbol->string"](sym)))));});
LISP["compile-string"] = (function(str){return (LISP["string-append"]("\"", LISP["escape-string"](str), "\""));});
LISP["compile-regexp"] = (function(regex){return (LISP["string-append"]("/", LISP["regexp->string"](regex), "/"));});
LISP["compile-literal"] = (function(s, env){return (((LISP["number?"](s)) !== LISP.nil ? (LISP["number->string"](s)) : (((LISP["symbol?"](s)) !== LISP.nil ? (LISP["compile-symbol"](s, env)) : (((LISP["string?"](s)) !== LISP.nil ? (LISP["compile-string"](s)) : (((LISP["regexp?"](s)) !== LISP.nil ? (LISP["compile-regexp"](s)) : (((LISP["null?"](s)) !== LISP.nil ? ("LISP.nil") : (((LISP["eq?"](s, LISP.t)) !== LISP.nil ? ("LISP.t") : (((LISP["eq?"](s, LISP.nil)) !== LISP.nil ? ("LISP.nil") : (LISP.error(LISP["string-append"]("compile-literal: [", s, "]")))))))))))))))));});
LISP["compile-funcall"] = (function(s, env){return ((function(fn, args){return (LISP["string-append"](LISP["compile*"](fn, env), "(", LISP["expand-args"](args, env), ")"));})(LISP.car(s), LISP.cdr(s)));});
LISP["compile-quote"] = (function(s, env){return ((function(x){return (((LISP["pair?"](x)) !== LISP.nil ? (LISP["compile*"](LISP.list(LISP.intern("cons"), LISP.list(LISP.intern("quote"), LISP.car(x)), LISP.list(LISP.intern("quote"), LISP.cdr(x))), env)) : (((LISP["symbol?"](x)) !== LISP.nil ? (LISP["string-append"]("LISP.intern(\"", LISP["escape-string"](LISP["symbol->string"](x)), "\")")) : (LISP["compile-literal"](x, env))))));})(LISP.car(s)));});
LISP["compile-if"] = (function(s, env){return ((function(p, then$2dnode, else$3f){return (LISP["string-append"]("((", LISP["compile*"](p, env), ") !== LISP.nil ? (", LISP["compile*"](then$2dnode, env), ") : (", ((LISP["null?"](else$3f)) !== LISP.nil ? ("LISP.nil") : (LISP["compile*"](LISP.car(else$3f), env))), "))"));})(LISP.car(s), LISP.cadr(s), LISP.cddr(s)));});
LISP["compile-set!"] = (function(s, env){return ((function(sym, val){return (LISP["string-append"](LISP["compile*"](sym, env), " = ", LISP["compile*"](val, env)));})(LISP.car(s), LISP.cadr(s)));});
LISP["compile-lambda"] = (function(s, env){return (LISP["extend-env"] = (function(env, params){return (LISP.append(params, env));}), (function(raw$2dparams, bodies){return ((function(params, rest){return ((function(newenv){return (LISP["string-append"]("(function(", LISP["expand-args"](params, newenv), "){", ((LISP["null?"](rest)) !== LISP.nil ? ("") : (LISP["string-append"]("var ", LISP["symbol->string"](rest), " = LISP._getRestArgs(arguments, ", LISP["number->string"](LISP.length(params)), "); "))), "return (", LISP["expand-body"](bodies, newenv), ");})"));})(LISP["extend-env"](env, ((LISP["null?"](rest)) !== LISP.nil ? (params) : (LISP.append(LISP.list(rest), params))))));})(((LISP["proper-list?"](raw$2dparams)) !== LISP.nil ? (raw$2dparams) : (LISP["reverse!"](LISP.reverse(raw$2dparams)))), ((LISP["pair?"](raw$2dparams)) !== LISP.nil ? (LISP.cdr(LISP["last-pair"](raw$2dparams))) : (raw$2dparams))));})(LISP.car(s), LISP.cdr(s)));});
LISP["compile-define"] = (function(s, env){return ((function(name, body){return (((LISP["pair?"](name)) !== LISP.nil ? (LISP["compile-define"](LISP.list(LISP.car(name), LISP["list*"](LISP.intern("lambda"), LISP.cdr(name), body)), env)) : (LISP["string-append"](LISP["compile-symbol"](name, env), " = ", LISP["compile*"](LISP.car(body), env)))));})(LISP.car(s), LISP.cdr(s)));});
LISP["compile-defmacro"] = (function(s, env){return ((function(name, params, body){return ((function(exp){return (LISP["do-compile-defmacro"](name, exp));})(LISP["list*"](LISP.intern("lambda"), params, body)));})(LISP.caar(s), LISP.cdar(s), LISP.cdr(s)));});
LISP.macroexpand = (function(exp){return ((function(expanded){return (((LISP["equal?"](expanded, exp)) !== LISP.nil ? (exp) : (LISP.macroexpand(expanded))));})(LISP["macroexpand-1"](exp)));});
LISP["*special-forms*"] = LISP.list(LISP.cons(LISP.intern("quote"), LISP["compile-quote"]), LISP.cons(LISP.intern("if"), LISP["compile-if"]), LISP.cons(LISP.intern("set!"), LISP["compile-set!"]), LISP.cons(LISP.intern("lambda"), LISP["compile-lambda"]), LISP.cons(LISP.intern("define"), LISP["compile-define"]), LISP.cons(LISP.intern("define-macro"), LISP["compile-defmacro"]));
LISP["special-form?"] = (function(s){return ((function(__16){return (((__16) !== LISP.nil ? (LISP.cdr(__16)) : (LISP.nil)));})(LISP.assoc(LISP.car(s), LISP["*special-forms*"])));});
LISP["compile*"] = (function(s, env){return ((function(expanded){return (((LISP["eq?"](expanded, s)) !== LISP.nil ? (((LISP["pair?"](s)) !== LISP.nil ? ((function(__17){return (((__17) !== LISP.nil ? ((function(fn){return (fn(LISP.cdr(s), env));})(__17)) : (LISP["compile-funcall"](LISP.macroexpand(s), env))));})(LISP["special-form?"](s))) : (LISP["compile-literal"](s, env)))) : (LISP["compile*"](expanded, env))));})(LISP.macroexpand(s)));});
LISP.compile = (function(s){return (LISP["compile*"](s, LISP.nil));});
