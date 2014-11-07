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
  var runCodes = function(codes) {
    var reader = new LISP.SReader(codes);
    var s;
    for (;;) {
      s = reader.read();
      if (!s)
        break;

      LISP.eval(s);
    }
    return s === undefined;
  };

  if (process.argv.length < 3) {
    readAllFromStdin(function(text) {
      process.exit(runCodes(text) ? 0 : 1);
    });
  } else {
    var fs = require('fs');
    var loop = function(index) {
      if (index >= process.argv.length) {
        process.exit(0);
        return;
      }
      var fileName = process.argv[index];
      fs.readFile(fileName, 'utf-8', function(error, text) {
        if (error) {
          console.error('File open error [' + fileName + ']: ' + error);
          process.exit(1);
        }

        if (!runCodes(text))
          process.exit(1);
        loop(index + 1);
      });
    };
    loop(2);
  }
})();
