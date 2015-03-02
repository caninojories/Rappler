(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

      GETABOUTUS   = require('../adminApImplementation/aboutUs/getIndex.js'),
      POSTABOUTUS   = require('../adminApImplementation/aboutUs/postIndex.js');

  app.route('/api/aboutUs')
    .get(GETABOUTUS.getAboutUs)
    .post(POSTABOUTUS.postAboutUs);

  module.exports = app;
}());
