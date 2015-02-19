(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.postContactUs = function(req, res, next) {
    if(!req.body.firstName) {return res.json('firstName is not defined');}
    if(!req.body.lastName) {return res.json('lastName is not defined');}
    if(!req.body.email) {return res.json('email is not defined');}
    if(!req.body.subject) {return res.json('subject is not defined');}
    if(!req.body.message) {return res.json('message is not defined');}

    node.mongoDB(node, node.config.dbName)
      .then(function() {
        var contactUs = node.ContactUs({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          subject: req.body.subject,
          message: req.body.message,
        });
        return contactUs;
      }).then(function(contactUs, error) {
        contactUs.save(function() {
          res.json('success');
        });
      });
  };
}());
