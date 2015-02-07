(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.deleteMood = function(req, res, next) {
    console.log( req.body );
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.Mood
          .findOne({userId: req.body.userId})
          .remove(result);

        function result(error, mood) {
          console.log('mood: ' + mood);
          console.log('erro: ' + error);
          res.json('remove');
        }

      });
  };
}());
