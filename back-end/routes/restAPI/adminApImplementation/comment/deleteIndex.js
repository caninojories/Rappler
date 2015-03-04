(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.deleteOneComment = function(req, res, next) {
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.Comment
          .findByIdAndRemove(node.ObjectId(req.body.id))
          .exec()
          .then(function() {
            res.json('success');
          });
      });
  };
}());
