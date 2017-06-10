var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list,'utf8', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  return this.readListOfUrls((data) => {
    var arr = data.split('\n');
    //console.log("=========>", arr);
    arr.forEach( (item) => {
      if(item === url) {
        return true;
      }
    });
  });
};

exports.addUrlToList = function(url, callback) {
  if (!this.isUrlInList(url)) {
    fs.appendFile(this.paths.list, url + '\n', 'utf8', (error) => {
      if (error) {
        console.error(error);
      }
    })
  }
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
