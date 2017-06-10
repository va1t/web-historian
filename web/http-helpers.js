var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  fs.readFile(asset, function(error, data) {
    if (error) {
      console.error(error);
      callback(-1);
    } else {
      callback(data);
    }
  })
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

exports.writeResponse =  function(res, data, responseCode) {
  res.writeHead(responseCode, this.headers);
  res.write(data);
  res.end(/*paths.archives.list*/);
}

exports.getRequestedURL = (req, callback) => {
  var url = [];
  req.on('data', function(chunk) {
    url.push(chunk);
  }).on('end', function() {
    url = Buffer.concat(url).toString();
    url = url.slice(4);
    callback(url);
  });
}
// As you progress, keep thinking about what helper functions you can put here!
