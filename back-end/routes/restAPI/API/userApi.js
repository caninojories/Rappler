(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

      GET_User = require( '../adminApImplementation/user/getIndex.js' ),
      PUT_User = require( '../adminApImplementation/user/putIndex.js');

  app.route( '/api/user' )
    .get( GET_User.getUserList )
    .put( PUT_User.putUserOne );

  app.route( '/api/photo' )
    .post(function( req, res, next ) {
      var imagePath;
      if( !req.files ) {
        res.json( {imagePath: imagePath} );
      } else {
        imagePath  = req.files.image.path.split('/uploads/')[1];
        res.json( {imagePath: imagePath} );
      }
    });

  module.exports = app;
}());
