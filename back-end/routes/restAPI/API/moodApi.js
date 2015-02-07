(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

      POSTONEMOOD = require('../adminApImplementation/mood/postIndex.js');

  app.route('/api/mood')
    .post(POSTONEMOOD.postOneMood);

  module.exports = app;
}());
