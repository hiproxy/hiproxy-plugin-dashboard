/**
 * @file hiproxy plugin routes
 * @author zdying
 */

'use strict';

var fs = require('fs');
var path = require('path');
var mustache = require('mustache');
var getMimeType = require('simple-mime')('text/plain');

module.exports = [
  {
    route: '/dashboard',
    render: function (route, request, response) {
      response.writeHead(301, {
        Location: '/dashboard/'
      });

      response.end();
    }
  },
  {
    route: '/dashboard/(*)',
    render: function (route, request, response) {
      var pageName = route._ || 'index.html';
      var data = null;
      var hiServer = global.hiproxyServer;
      var filePath = path.join(__dirname, '..', pageName);
      var httpsServer = hiServer.httpsServer || {
        address: function () {return 'N/A'},
        listening: false
      };

      if (pageName === 'index.html') {
        data = hiServer ? {
          hosts: hiServer.hosts._files,
          rewrites: hiServer.rewrite._files,
          httpServer: {
            title: 'hiproxy http server',
            port: hiServer.httpPort,
            address: hiServer.httpServer.address(),
            listening: hiServer.httpServer.listening
          },
          httpsServer: {
            title: 'hiproxy https server',
            port: httpsServer ? hiServer.httpsPort : 'N/A',
            address: httpsServer.address(),
            listening: httpsServer.listening
          },
          args: global.args,
          argv: process.argv,
          pid: process.pid
        } : null;

        return render(filePath, response, {info: JSON.stringify(data)});
      }

      sendFile(filePath, response);
    }
  }
];

function render (file, res, data) {
  var statusCode = 200;
  var content = null;

  fs.readFile(file, 'utf-8', function (err, text) {
    if (err) {
      statusCode = 500;
      content = err.stack;
    } else {
      content = mustache.render(text, data);
    }

    res.writeHead(statusCode, {
      'Content-Type': 'text/html',
      'Powder-By': 'hiproxy-plugin-dashboard'
    });

    res.end(content);
  });
}

function sendFile (file, res) {
  var mime = getMimeType(file);
  var statusCode = 200;
  var error = null;
  var stream = null;

  try {
    stream = fs.createReadStream(file);
  } catch (err) {
    statusCode = 500;
  }

  res.writeHead(statusCode, {
    'Content-Type': mime,
    'Powder-By': 'hiproxy-plugin-dashboard'
  });

  if (stream) {
    stream.pipe(res);
  } else {
    res.end(error.stack || error.message || error);
  }
}
