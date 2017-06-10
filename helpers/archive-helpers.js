var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http')

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
 //     console.log('=========', data.split('\n'));
      callback(data.split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback) {
  return this.readListOfUrls((dataArray) => {
//    console.log("=========>", dataArray.includes(url));
    callback(dataArray.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  callback(fs.appendFile(this.paths.list, url + '\n', 'utf8', (error) => {
      if (error) {
        console.error(error);
      }
    })
  );
};

exports.isUrlArchived = function(url, callback) {
  //archive.paths.archived + '/' + url
  fs.readdir(this.paths.archivedSites + '/', (error, files) => {
    if(error) {
      console.error(error);
    } else {
      callback(files.includes(url));
    }
  });
};

exports.downloadUrls = function(urls) {
  //for each url -- check if it's archived
  // if not download to archive --put it in archives.sites
  urls.forEach((url) => {
    http.get('http://'+ url, (res) => {
      var website = fs.createWriteStream(this.paths.archivedSites + '/' + url);
      res.pipe(website);
    });
  });
};
