(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.putUserOne = function( req, res, next ) {
    node.mongoDB( node, node.config.dbName )
    .then(function() {
      node.User
      .findOne({email:req.body.email}, function( err, document ) {
        document.accessType = req.body.accessType;
        document.save();
        res.json( {data:'success'} );
      });
    });
  };
}());
