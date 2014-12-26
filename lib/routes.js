'use strict';

var api = require('./controllers/api'),
      download = require('./controllers/download'),
      index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);
  app.route('/api/search/:code')
    .get(api.search);
  app.route('/api/downloaded/:code')
    .get(api.downloaded);
  app.route('/api/download/:code')
    .get(api.download);
  app.route('/api/convert/:code')
    .get(api.convert);

  // Send the downloads
  app.route('/download/video/:code')
    .get(download.video);
  app.route('/download/audio/:code')
    .get(download.audio);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get(index.index);
};
