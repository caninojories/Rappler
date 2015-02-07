(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.deleteMood = function(req, res, next) {
    console.log( req.body );
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.Mood
          .findOne({userId: req.body.userId}, function(error, mood) {
            console.log('mood: ' + mood);
          })
          .remove(result);

        function result(mood) {
          res.json('remove');
        }

      });
  };
}());
