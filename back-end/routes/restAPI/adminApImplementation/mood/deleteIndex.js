(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.deleteMood = function(req, res, next) {
    console.log( req.body );
    var moodUser;
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.Mood
          .findOne({userId: req.body.userId}, function(error, mood) {
            console.log('mood: ' + mood);
            moodUser = mood.mood;
          })
          .remove(result);

        function result(mood) {
          node.MoodCount
          .findOne({postId: req.body.postId}, function(error, mood) {
            console.log( 'else count: ' + mood);

            switch(moodUser) {
              case 'happy':
                mood.happy = mood.happy - 1;
                break;
              case 'sad':
                mood.sad = mood.sad - 1;
                break;
              case 'annoyed':
                mood.annoyed = mood.annyoed - 1;
                break;
              case 'inspired':
                mood.inspired = mood.inspired - 1;
                break;
              case 'afraid':
                mood.afraid = mood.afraid - 1;
                break;
            }

            mood.save(function(){
              res.json('Success: mood vote has been remove');
            });
          });
        }

      });
  };
}());
