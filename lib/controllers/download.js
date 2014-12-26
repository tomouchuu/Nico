'use strict';

var path = require('path');

/**
 * Send our audio, or 404 if it doesn't exist
 */
exports.audio = function(req, res) {
  var code = req.params.code;
  var title = req.query.title;

  var destination = path.resolve('public/audios/' + code + '.mp3');

  res.download(destination, title + '.mp3', function(err) {
    if(err) {
      console.log("No such audio file: '" + code + " exists'\n", err);
      res.status(404);
      res.send(404);
    }
  });
};

/**
 * Send our video, or 404 if it doesn't exist
 */
exports.video = function(req, res) {
  var code = req.params.code;
  var title = req.query.title;
  var format = req.query.format;

  var destination = path.resolve('public/videos/' + code + '.' + format );

  res.download(destination, title + '.' + format, function(err) {
    if(err) {
      console.log("No such file: '" + code + " exists'\n", err);
      res.status(404);
      res.send(404);
    }
  });
};