/**
 * @file hiproxy plugin routes
 * @author zdying
 */

'use strict';

module.exports = [
  {
    route: '/dashboard',
    render: function (route, request, response) {
      var routeArr = route.split('/');
      var pageName = routeArr.slice(2).join('/');

      response.writeHead(200, {
        'Content-Type': 'text/html',
        'Powder-By': 'hiproxy-plugin-dashboard'
      });

      response.end('<h1>hiproxy dashboard</h1>');
    }
  }
];