(function () {
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

  var codes = document.getElementById('code').value;
  runCodes(codes);

  var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: 'scheme',
    theme: 'ambiance',
    matchBrackets: true,
    keyMap: 'emacs'
  });

  runTextAreaCode = function() {
    var codes = editor.getValue();
    runCodes(codes);
  };
})();