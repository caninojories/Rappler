(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.putOneContactUs = function( req, res, next ) {
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.ContactUs
          .findById(req.body.id, documents );

          function documents( handleError, document ) {
            document.firstName  = req.body.firstName,
            document.lastName   = req.body.lastName,
            document.email      = req.body.email,
            document.subject    = req.body.subject,
            document.message    = req.body.message,
            document.save(function( err ) {
              if( err ) next( err );
              res.json( 'success' );
            });
          }
      });
  };
}());
