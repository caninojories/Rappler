(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getContact = function(req, res, next) {
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.Contact
          .findOne()
          .exec(callback);

          function callback(error, contact) {
            res.json(contact);
          }
      });
  };
}());
