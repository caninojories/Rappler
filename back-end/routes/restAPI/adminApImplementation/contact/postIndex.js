(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.postContact = function(req, res, next) {
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        var contact = node.ContactUs({
          street: req.body.street,
          barangay: req.body.barangay,
          city: req.body.city,
          province: req.body.province,
          content: req.body.content,
          contact: req.body.contact
        });
        return contact;
      }).then(function(contact, error) {
        contact.save(function() {
          res.json('success');
        });
      });
  };
}());
