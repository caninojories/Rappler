(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.postOneMood = function(req, res, next) {
    var moodUser = req.body.mood;
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        var mood = node.Mood({
          postId: req.body.postId,
          userId: req.body.userId,
          mood: moodUser
        });

        return mood;
      }).then(function(mood, error) {
        mood.save(function(error) {
          if(error) next(error);
          return 'save';
        });
      }).then(function(moodSave, error) {
        node.MoodCount.count({}, function(error, count) {
          if(count === 0) {
              var options;
              switch(moodUser) {
                case 'happy':
                  options = {
                    happy: 1,
                    sad: 0,
                    annoyed: 0,
                    inspired: 0,
                    afraid: 0
                  };
                  break;
                case 'sad':
                  options = {
                    happy: 0,
                    sad: 1,
                    annoyed: 0,
                    inspired: 0,
                    afraid: 0
                  };
                  break;
                case 'annoyed':
                  options = {
                    happy: 0,
                    sad: 0,
                    annoyed: 1,
                    inspired: 0,
                    afraid: 0
                  };
                  break;
                case 'inspired':
                  options = {
                    happy: 0,
                    sad: 0,
                    annoyed: 0,
                    inspired: 1,
                    afraid: 0
                  };
                  break;
                case 'afraid':
                  options = {
                    happy: 0,
                    sad: 0,
                    annoyed: 0,
                    inspired: 0,
                    afraid: 1
                  };
                  break;
              }
              var moodCount = node.MoodCount(options);
              moodCount.save(function(error) {
                if(error) next(error);
                res.json('success');
              });
          } else {
            node.MoodCount
              .findOne({}, function(error, mood) {
                console.log( 'else count: ' + mood);

                switch(moodUser) {
                  case 'happy':
                    mood.happy = mood.happy + 1;
                    break;
                  case 'sad':
                    mood.sad = mood.sad + 1;
                    break;
                  case 'annoyed':
                    mood.annoyed = mood.annyoed + 1;
                    break;
                  case 'inspired':
                    mood.inspired = mood.inspired + 1;
                    break;
                  case 'afraid':
                    mood.afraid = mood.afraid + 1;
                    break;
                }

                mood.save();
              });
          }
        });
      });
  };
}());
