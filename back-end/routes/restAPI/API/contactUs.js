(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

      GETCONTACTUS  = require('../adminApImplementation/contactUs/getIndex.js'),
      PUTCONTACTUS  = require('../adminApImplementation/contactUs/putIndex.js'),
      POSTCONTACTUS = require('../adminApImplementation/contactUs/postIndex.js'),
      DELETECONTACTUS = require('../adminApImplementation/contactUs/deleteIndex.js');

  app.route('/api/contactus')
    .get(GETCONTACTUS.getContactUs)
    .put(PUTCONTACTUS.putOneContactUs)
    .post(POSTCONTACTUS.postContactUs)
    .delete(DELETECONTACTUS.deleteContactUs);

  module.exports = app;
})();
