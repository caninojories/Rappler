(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.headline = function(req, res, next) {
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.PostHeadline
          .find({department:req.body.department})
          .remove(function() {
            res.json('success');
          });
      });
  };

  exports.topTenNews = function(req, res, next) {
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.PostTopTen
          .find({department:req.body.department})
          .remove(function() {
            res.json('success');
          });
      });
  };

  exports.carousel = function(req, res, next) {
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.PostCarousel
          .findOne()
          .remove(function() {
            res.json('success');
          });
      });
  };
}());