(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.postAboutUs = function(req, res, next) {
    console.log(req.body);
    if (!req.body.title) {return res.json('title is undefined plss check your data');}
    else if (!req.body.content ) {return res.json('content is undefined plss check your data');}
    else if (!req.body.tag) {return res.json('tag is undefined plss check your data');}

    node.mongoDB(node, node.config.dbName)
      .then(function() {
        var about = node.AboutUs({
          title: req.body.title,
          content: req.body.content,
          tag: req.body.tag
        });
        return about;
      }).then(function(aboutus, error) {
        aboutus.save(function() {
          res.json('success');
        });
      });
  };
}());
