(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.putPostStatusOne = function( req, res, next ) {
    console.log( req.body );
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .findById(req.body.id, documents );

          function documents( handleError, document ) {
            document.status = req.body.status;
            document.save(function( err ) {
              if( err ) next( err );
              res.json( 'success' );
            });
          }
      });
  };
}());
