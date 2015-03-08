(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.deleteContactUs = function(req, res, next) {
    if(req.body.id) {res.json('id is undefined');}
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.ContactUs
          .findByIdAndRemove(node.ObjectId(req.body.id))
          .exec()
          .then(function() {
            res.json('success');
          });
      });
  };
}());
