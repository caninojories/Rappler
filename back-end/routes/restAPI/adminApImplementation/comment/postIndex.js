(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.postOneComment = function(req, res, next) {
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        var comment = node.Comment({
          postId: req.body.postId,
          userId: req.body.userId,
          content: req.body.content
        });
        return comment;
      }).then(function(mood, error) {
        mood.save(function() {
          res.json('success');
        });
      });
  };
}());
