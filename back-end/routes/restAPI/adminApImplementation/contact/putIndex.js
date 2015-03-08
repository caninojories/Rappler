(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.putOneContact = function( req, res, next ) {
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Contact
          .findById(req.body.id, documents );

          function documents( handleError, document ) {
            document.street   = req.body.street;
            document.barangay = req.body.barangay;
            document.city     = req.body.city;
            document.province =  req.body.province;
            document.content  = req.body.content;
            document.contact  = req.body.contact;
            document.save(function( err ) {
              if( err ) next( err );
              res.json( 'success' );
            });
          }
      });
  };
}());
