(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getContactUs = function(req, res, next) {
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.ContactUs
          .find()
          .exec(callback);

          function callback(error, contactUs) {
            res.json(contactUs);
          }
      });
  };
}());
