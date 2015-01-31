(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.putPostStatusOne = function( req, res, next ) {
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .findOne( {email: req.body.email}, documents );

          function documents( handleError, document ) {
            document.accessType = req.body.accessType;
            document.save(function( err ) {
              if( err ) next( err );
              res.json( 'success' );
            });
          }
      });
  };
}());
