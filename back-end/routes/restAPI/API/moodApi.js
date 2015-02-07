(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

      GETONEMOOD  = require('../adminApImplementation/mood/getIndex.js'),
      GETMOODCOUNT = require('../adminApImplementation/mood/getIndex.js'),
      POSTONEMOOD = require('../adminApImplementation/mood/postIndex.js');

  app.route('/api/mood')
    .get(GETONEMOOD.getOneMood)
    .post(POSTONEMOOD.postOneMood);

  app.route('/api/mood/postId')
    .get(GETMOODCOUNT.getMoodCount);

  module.exports = app;
}());
