var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers.js')
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //console.log('============', req.url)
  if(req.method === 'GET') {
    if(req.url === '/') {
      http.serveAssets(res, archive.paths.siteAssets + '/index.html', (data) => {
        http.writeResponse(res, data, 200);
      });
    } else {
      http.serveAssets(res, archive.paths.archivedSites + req.url, (data) => {
        if(data === -1) {
          http.writeResponse(res, 'file not found', 404);
        } else {
          http.writeResponse(res, data, 200);
        }
      });
    }
  } else if (req.method === 'POST') {
     http.getRequestedURL(req, function(url) {
      archive.addUrlToList(url);
      http.writeResponse(res, '', 302);
     });

  }
};
