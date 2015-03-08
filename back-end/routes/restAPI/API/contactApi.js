(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

      GETCONTACT  = require('../adminApImplementation/contact/getIndex.js'),
      PUTCONTACT    = require('../adminApImplementation/contact/putIndex.js'),
      POSTCONTACT = require('../adminApImplementation/contact/postIndex.js');

  app.route('/api/contact')
    .get(GETCONTACT.getContact)
    .put(PUTCONTACT.putOneContact)
    .post(POSTCONTACT.postContact);

  module.exports = app;
})();
