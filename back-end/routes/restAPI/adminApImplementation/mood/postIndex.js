(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.postOneMood = function(req, res, next) {
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
          node.mongoDB(node, node.config.dbName)
            .then(function() {
              node.ModeCount
                .findOne({}, function(error, user) {
                  user.happy = user.happy + 1;
                  user.sad   = user.sad + 1;
                  user.annoyed = user.annoyed + 1;
                  user.inspired = user.inspired + 1;
                  user.afraid = user.afraid + 1;

                  user.save(function() {
                    res.json('success');
                  });
                });
            });
        });
      });
  };
}());
