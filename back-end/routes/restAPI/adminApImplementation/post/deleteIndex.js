(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.headline = function(req, res, next) {
    if(!req.body.department){res.json('department  is undefined');}
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
    if(!req.body.postId){res.json('postId  is undefined');}
    if(!req.body.department){res.json('department  is undefined');}
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.PostTopTen
          .find({department:req.body.department, postId: req.body.postId})
          .remove(function() {
            res.json('success');
          });
      });
  };

  exports.carousel = function(req, res, next) {
    if(!req.body.postId){res.json('postId  is undefined');}
    if(!req.body.department){res.json('department  is undefined');}
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.PostCarousel
          .findOne({department:req.body.department, postId: req.body.postId})
          .remove(function() {
            res.json('success');
          });
      });
  };

  exports.deleteOnePost = function(req, res, next) {
    if(!req.body.id){res.json('id  is undefined');}
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.Post
          .findByIdAndRemove(node.ObjectId(req.body.id))
          .exec()
          .then(function() {
            res.json('success');
          });
      });
  };
}());
