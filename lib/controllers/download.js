'use strict';

var path = require('path');

/**
 * Send our audio, or 404 if it doesn't exist
 */
exports.audio = function(req, res) {
  var file = req.params.file;

  var destination = path.resolve('public/audios/' + file);

  res.download(destination, file, function(err) {
    if(err) {
      console.log("No such file: '" + file + " exists'\n", err);
      res.status(404);
      res.send(404);
    }
  });
};

/**
 * Send our video, or 404 if it doesn't exist
 */
exports.video = function(req, res) {
  var file = req.params.file;

  var destination = path.resolve('public/videos/' + file);

  res.download(destination, file, function(err) {
    if(err) {
      console.log("No such file: '" + file + " exists'\n", err);
      res.status(404);
      res.send(404);
    }
  });
};