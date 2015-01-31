(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getUserList = function( req, res, next ) {
    node.mongoDB( node, node.config.dbName )
      .then(function( connection ) {
        node.User
          .find()
          .exec( documents );
      });

      function documents( handleError , documentList ) {
        if( handleError ) next( handleError );
        res.status(200).send( documentList );
      }
  };
}());
