/**
 * @file
 * @author zdying
 */

var fs = require('fs');
var path = require('path');

module.exports = function (data, req, res) {
  var originFile = data.file;
  var type = data.type;
  var file = path.resolve(originFile);

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  fs.readFile(file, 'utf-8', function (err, string) {
    if (err && (type === 'hosts' || type === 'rewrite')) {
      var rewriteFiles = global.hiproxyServer[type]._files;
      if (rewriteFiles[originFile] && rewriteFiles[originFile].source) {
        res.end(JSON.stringify({
          status: 0,
          message: '',
          data: {
            content: rewriteFiles[originFile].source,
            file: originFile
          }
        }));
      } else {
        res.end(JSON.stringify({
          status: 1,
          message: err.message,
          data: {}
        }));
      }
    } else {
      res.end(JSON.stringify({
        status: 0,
        message: '',
        data: {
          content: string,
          file: file
        }
      }));
    }
  });
};
