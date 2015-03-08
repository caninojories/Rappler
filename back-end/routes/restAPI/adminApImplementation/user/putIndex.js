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

  exports.putUserVerify = function(req, res, next) {
    console.log(req.body);
    var payLoad = node.jwt.decode( req.body.token, 'shhh..' );
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.User
        .findById(payLoad.sub, function( err, document ) {
          document.verified = true;
          document.save();
          res.json( {data:'success'} );
        });
    });
  };
}());
