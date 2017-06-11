var helper = require('../helpers/archive-helpers');

var fetcher = () => {
  helper.readListOfUrls( (urls) => {
    //removes  empty string from end of urls list
    console.log ('FETCHING URLS')
    urls.pop();
    helper.downloadUrls(urls);
  });
};

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
fetcher();
