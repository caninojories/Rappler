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
              if(node.ModeCount === undefined) {
                var moodCount = node.MoodCount({
                  happy: 1,
                  sad: 1,
                  annoyed: 1,
                  inspired: 1,
                  afraid: 1
                });
                return moodCount;
              } else {
                node.ModeCount
                  .findOne({}, function(error, count) {

                  });
              }
            }).then(function(count, error) {
              console.log('Count Object: ' + count);
              count.save(function(error) {
                res.json('success');
              });
            });
        });
      });
  };
}());
