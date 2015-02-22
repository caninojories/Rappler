(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getPostList = function( req, res, next ) {
    var query = node.url.parse( req.url ,true).query,
        re = new RegExp(query.query, 'i'),
        find  = null;

    if(query.query) {
      find = {
        'title': {
          $regex: re
        }
      };
    } else {
      find = {};
    }

    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .find(find)
          .skip(query.skip)
          .limit(query.limit)
          .sort({date: -1})
          .exec( documents );

          function documents( handleError , documentList ) {
            if( handleError ) next( handleError );
            res.status(200).send( documentList );
          }
      });
  };

  exports.getOnePost = function( req, res, next ) {
    var query = node.url.parse( req.url ,true).query,
        id    = query.id.toString();
    console.log( id );
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .findById(node.ObjectId(id), callback);

          function callback( handleError , post ) {
            if( handleError ) next( handleError );
            res.status(200).send( post );
          }
      });
  };

  exports.getPostListApproved = function( req, res, next ) {
    var query = node.url.parse( req.url ,true).query;
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .find({status: query.status || 'approved'})
          .skip(query.skip)
          .limit(query.limit)
          .sort({date: -1})
          .exec( documents );

          function documents( handleError , documentList ) {
            if( handleError ) next( handleError );
            res.status(200).send( documentList );
          }
      });
  };

  exports.getPostDepartmentList = function( req, res, next ) {
    var query = node.url.parse( req.url ,true).query,
        re = new RegExp(query.query, 'i'),
        find  = null;
        console.log(query);
    if(query.query) {
      find = {
        'title': {
          $regex: re
        },
        department: query.department
      };
    } else {
      find = {department: query.department};
    }

    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .find(find)
          .skip(query.skip)
          .limit(query.limit)
          .sort({date: -1})
          .exec( documents );

          function documents( handleError , documentList ) {
            if( handleError ) next( handleError );
            res.status(200).send( documentList );
          }
      });
  };

  exports.getPostDepartmentListApproved = function( req, res, next ) {
    var query = node.url.parse( req.url ,true).query;
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .find({department: query.department, status: query.status || 'approved'})
          .skip(query.skip)
          .limit(query.limit)
          .sort({date: -1})
          .exec( documents );

          function documents( handleError , documentList ) {
            if( handleError ) next( handleError );
            res.status(200).send( documentList );
          }
      });
  };

  exports.headline = function(req, res, next) {
    var query = node.url.parse( req.url ,true).query;
    if(!query.department) {return res.json('deparment is not defiend');}
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.PostHeadline
          .findOne({department:query.department})
          .exec()
          .then(function(result) {
            res.json(result);
          });
      });
  };

  exports.topTenNews = function(req, res, next) {
    var query = node.url.parse( req.url ,true).query;
    //if(query.department !==null) {return res.json('deparment is not defiend');}
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.PostTopTen
          .find({department:query.department})
          .exec()
          .then(function(result) {
            res.json(result);
          });
      });
  };

  exports.carousel = function(req, res, next) {
    var query = node.url.parse( req.url ,true).query;
    if(!query.department) {return res.json('deparment is not defiend');}
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.PostCarousel
          .find({department:query.department})
          .exec()
          .then(function(result) {
            res.json(result);
          });
      });
  };

  exports.unsubscribe = function(req, res, next) {
    var query = node.url.parse( req.url ,true).query;
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.PostSubscription
          .find({email:query.email})
          .exec()
          .then(function(result) {
            res.json(result);
          });
      });
  };

}());
