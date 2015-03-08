(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.putAboutUs = function( req, res, next ) {
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.AboutUs
          .findById(req.body.id, documents );

          function documents( handleError, document ) {
            document.title    = req.body.title;
            document.content  = req.body.content;
            document.tag      = req.body.tag;
            document.save(function( err ) {
              if( err ) next( err );
              res.json( 'success' );
            });
          }
      });
  };
}());
