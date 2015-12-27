/*
  Usage:
    <script src="jslisp.js">
      (print (+ 1 2))
    </script>
 */

(function() {
  // Run Lisp codes.
  var runCodes = function(codes) {
    var stream = new LISP.StrStream(codes);
    for (;;) {
      var s = LISP.read(stream);
      if (s === undefined)
        break;
      LISP.eval(s);
    }
  };

  var scriptTags = document.getElementsByTagName('script');
  var myScriptTag = scriptTags[scriptTags.length - 1];
  var codes = myScriptTag.text;
  runCodes(codes);
})();