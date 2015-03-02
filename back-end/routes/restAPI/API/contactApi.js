(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

      GETCONTACTUS  = require('../adminApImplementation/contact/getIndex.js'),
      POSTCONTACTUS = require('../adminApImplementation/contact/postIndex.js');

  app.route('/api/contact')
    .get(GETCONTACTUS.getContact)
    .post(POSTCONTACTUS.postContact);

  module.exports = app;
})();
