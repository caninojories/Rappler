(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

      GETCONTACTUS  = require('../adminApImplementation/contactUs/getIndex.js'),
      POSTCONTACTUS = require('../adminApImplementation/contactUs/postIndex.js');

  app.route('/api/contactus')
    .get(GETCONTACTUS.getContactUs)
    .post(POSTCONTACTUS.postContactUs);

  module.exports = app;
})();
