'use strict';

var fs = require('fs');
var FFmpeg = require('fluent-ffmpeg');
var niconico = require('niconico');

var NNDEMAIL = '';
var NNDPASS = '';

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  res.json([
    {
      name : 'HTML5 Boilerplate',
      info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
      awesomeness: 10
    }, {
      name : 'AngularJS',
      info : 'AngularJS is a toolset for building the framework most suited to your application development.',
      awesomeness: 10
    }, {
      name : 'Karma',
      info : 'Spectacular Test Runner for JavaScript.',
      awesomeness: 10
    }, {
      name : 'Express',
      info : 'Flexible and minimalist web application framework for node.js.',
      awesomeness: 10
    }
  ]);
};

exports.search = function(req, res) {
  var smcode = req.params.code;

  var nicovideo, video_id;

  nicovideo = new niconico.Nicovideo({
    email: NNDEMAIL,
    password: NNDPASS,
    folder: 'app/videos'
  });

  nicovideo.search(smcode)
    .on('fetched', function(status, meta) {
      console.log('Fetched: ' + meta.title);
      return res.json(200, meta);
    });
};

exports.download = function(req, res) {
  var smcode = req.params.code;

  var nicovideo, video_id;

  nicovideo = new niconico.Nicovideo({
    email: NNDEMAIL,
    password: NNDPASS,
    folder: 'app/videos'
  });

  nicovideo.download(smcode)
    .on('fetched', function(status, meta) {
      console.log('Fetched: ' + meta.title);
    })
    .on('exported', function(meta) {
      var outStream;

      var path = 'audios/' + meta.title + '.mp3';

      console.log('Downloaded, Beginning Conversion');
      outStream = fs.createWriteStream('app/'+path);

      new FFmpeg({
        source: meta.filepath
      }).toFormat('mp3').on('error', function(err) {
        console.log('An error occurred: ' + err.message);
      }).on('end', function() {
        console.log(meta);
        console.log(path);
        return res.json(200, {
          meta: meta,
          path: path
        });
      }).writeToStream(outStream, {
        end: true
      });
    });
};
