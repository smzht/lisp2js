(function() {
  require('./jslisp');

  // Read all input from stdin, and fire callback.
  var readAllFromStdin = function(callback) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var all = '';
    process.stdin.on('data', function (chunk) {
      all += chunk;
    });
    process.stdin.on('end', function () {
      callback(all);
    });
  };

  // Run codes.
  var runCodes = function(codes, compile) {
    var reader = new LISP.SReader(codes);
    var s;
    for (;;) {
      s = reader.read();
      if (!s)
        break;

      if (compile) {
        var compiled = LISP.compile(s);
        LISP.print(compiled);
        LISP.jseval(compiled);  // Evaluate JS, even if compile flag is set.
      } else {
        LISP.eval(s);
      }
    }
    return s === undefined;
  };

  if (process.argv.length < 3) {
    readAllFromStdin(function(text) {
      process.exit(runCodes(text) ? 0 : 1);
    });
  } else {
    var fs = require('fs');
    var compileOnly = false;
    var loop = function(index) {
      if (index >= process.argv.length) {
        process.exit(0);
        return;
      }
      var fileName = process.argv[index];
      if (fileName === '-c') {
        compileOnly = true;
        return loop(index + 1);
      }
      fs.readFile(fileName, 'utf-8', function(error, text) {
        if (error) {
          console.error('File open error [' + fileName + ']: ' + error);
          process.exit(1);
        }

        if (!runCodes(text, compileOnly))
          process.exit(1);
        loop(index + 1);
      });
    };
    loop(2);
  }
})();
