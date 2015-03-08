(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

      GETABOUTUS  = require('../adminApImplementation/aboutUs/getIndex.js'),
      PUTABOUTUS  = require('../adminApImplementation/aboutUs/putIndex.js'),
      POSTABOUTUS = require('../adminApImplementation/aboutUs/postIndex.js'),
      DELETEABOUTUS =  require('../adminApImplementation/aboutUs/deleteIndex.js');

  app.route('/api/aboutUs')
    .get(GETABOUTUS.getAboutUs)
    .put(PUTABOUTUS.putAboutUs)
    .post(POSTABOUTUS.postAboutUs)
    .delete(DELETEABOUTUS.deleteAboutUs);

  module.exports = app;
}());
