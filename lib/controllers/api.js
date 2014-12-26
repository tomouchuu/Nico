'use strict';

var fs = require('fs');
var path = require('path');
var FfmpegCommand = require('fluent-ffmpeg');
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
    output: 'public/videos'
  });

  nicovideo.search(smcode)
    .on('fetched', function(status, meta) {
      console.log('Fetched: ' + meta.title);
      return res.json(200, meta);
    });
};

exports.downloaded = function(req, res) {
  var code = req.params.code;

  var audiopath, videopath;

  fs.open('public/audios/'+code+'.mp3', 'r', function(err, file) {
    if (err === null) {
      // Audio & Video exists
      audiopath = 'public/audios/'+code+'.mp3';
      videopath = 'public/videos/'+code+'.mp4';

      return res.json(200, {
        audiopath: audiopath,
        videopath: videopath
      });
    }
    else {
      // Check video exists
      fs.open('public/videos/'+code+'.mp4', 'r', function(err, file) {
        if (err === null) {
          // Video exists, generate audio
          audiopath = false;
          videopath = 'public/videos/'+code+'.mp4';

          return res.json(200, {
            audiopath: audiopath,
            videopath: videopath
          });
        }
        else {
          // Neither exists, generate both
          audiopath = false;
          videopath = false;

          return res.json(200, {
            audiopath: audiopath,
            videopath: videopath
          });
        }
      });
    }
  });

};

exports.convert = function(req, res) {
  var smcode = req.params.code;
  var videoFormat = req.query.format;
  var audiopath = 'audios/' + smcode + '.mp3';
  var outStream = fs.createWriteStream('public/' + audiopath);
  var videopath = path.resolve(path.join('public/videos', smcode + '.' + videoFormat));

  var convert = new FfmpegCommand();
  convert
    .input(videopath)
    .format('mp3')
    .on('error', function(err) {
      console.log('An error occurred: ' + err.message);
    })
    .on('end', function() {
      console.log('Completed!');
      return res.json(200, {
        audiopath: 'public/' + audiopath
      });
    })
    .writeToStream(outStream, { end: true });

};


exports.download = function(req, res) {
  var smcode = req.params.code;

  var nicovideo, video_id;

  nicovideo = new niconico.Nicovideo({
    email: NNDEMAIL,
    password: NNDPASS,
    output: 'public/videos'
  });

  nicovideo.download(smcode)
    .on('exported', function(meta) {
      var outStream;

      var audiopath = 'audios/' + meta.video_id + '.mp3';

      console.log('Downloaded, Beginning Conversion');
      outStream = fs.createWriteStream('public/'+audiopath);

      var convert = new FfmpegCommand();
      convert
        .input(meta.filepath)
        .format('mp3')
        .on('error', function(err) {
          console.log('An error occurred: ' + err.message);
        })
        .on('end', function() {
          console.log('Completed!');
          return res.json(200, {
            videopath: meta.filepath,
            audiopath: 'public/' + audiopath
          });
        })
        .writeToStream(outStream, { end: true });
    });

};
