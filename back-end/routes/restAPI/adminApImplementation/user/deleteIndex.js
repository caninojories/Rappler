(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.deleteOneUser = function(req, res, next) {
    var query = node.url.parse(req.url, true).query;
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.User
          .findByIdAndRemove( query.id, callback );

          function callback( err, document) {
            if (err) next(err);
            res.json( 200, document );
          }
      });
  };
}());
