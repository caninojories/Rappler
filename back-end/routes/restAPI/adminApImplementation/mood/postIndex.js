(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.postOneMood = function(req, res, next) {
    console.log(req.body);
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        var mood = node.Mood({
          postId: req.body.postId,
          userId: req.body.userId,
          mood: req.body.mood
        });

        return mood;
      }).then(function(mood, error) {
        mood.save(function(err) {
          res.json('success');
        });
      });
  };
}());
