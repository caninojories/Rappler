(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.postOneComment = function(req, res, next) {
    if (!req.body.postId) {return res.json('postId is undefined plss check your data');}
    else if (!req.body.userId) {return res.json('userId is undefined plss check your data');}
    else if (!req.body.content) {return res.json('content is undefined plss check your data');}

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
