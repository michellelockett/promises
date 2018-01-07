/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var promiseConstructor = require('./promiseConstructor.js');
var promisification = require('./promisification.js');
var fs = require('fs');
var Promise = require('bluebird');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(userName) {
      return promisification.getGitHubProfileAsync(userName);
    })
    .then(function(body) {
      return new Promise(function(resolve, reject) {
        fs.writeFile(writeFilePath, JSON.stringify(body), function(err) {
          if (err) { return reject(err); }

          resolve();
        });
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
// //from promisificaiton
// module.exports = {
//   getGitHubProfileAsync: getGitHubProfileAsync,
//   generateRandomTokenAsync: generateRandomTokenAsync,
//   readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
// };
// //from promiseConstructor
// module.exports = {
//   getStatusCodeAsync: getStatusCodeAsync,
//   pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
// };
