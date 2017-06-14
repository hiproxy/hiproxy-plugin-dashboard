/**
 * @file
 * @author zdying
 */

var fs = require('fs');
var path = require('path');

module.exports = function (data, req, res) {
  var file = path.resolve(data.file);
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  fs.readFile(file, 'utf-8', function (err, string) {
    if (err) {
      res.end(JSON.stringify({
        status: 1,
        message: err.message,
        data: {}
      }));
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
}