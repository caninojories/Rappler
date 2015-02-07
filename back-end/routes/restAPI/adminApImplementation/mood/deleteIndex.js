(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.deleteMood = function(req, res, next) {
    console.log( req.body );
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.Mood
          .find({userId: req.body.userId}, result);

        function result(error, mood) {
          console.log(mood);
          mood.remove(function(error) {
            res.json('success');
          });
        }

      });
  };
}());
