(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

      GET_User = require( '../adminApImplementation/user/getIndex.js' ),
      PUTUSERVERIFY = require( '../adminApImplementation/user/putIndex.js' ),
      PUT_User = require( '../adminApImplementation/user/putIndex.js'),
      DELETEUSER = require('../adminApImplementation/user/deleteIndex.js');

  app.route( '/api/user' )
    .get( GET_User.getUserList )
    .put( PUT_User.putUserOne )
    .delete(DELETEUSER.deleteOneUser);

  app.route('/api/user/verify')
    .put(PUTUSERVERIFY.putUserVerify);

  // app.route('/api/user/delete')
  //   .delete(DELETEUSER.deleteOneUser);

  module.exports = app;
}());
