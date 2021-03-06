(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.postOne = function( req, res, next ) {
    var token = req.body.token;
    var payLoad = node.jwt.decode( token, 'shhh..' );

      node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.User
        .findById( payLoad.sub, function( err, document ) {
          var type;
          if( document.accessType === 'master') type = 'approved';
          else type = 'pending';
          node.mongoDB( node, node.config.dbName)
            .then(function() {
              var post = node.Post({
                title: req.body.title,
                content: req.body.content,
                status : type,
                imagePath: req.body.imagePath,
                // pdfPath: req.body.pdfPath,
                email: document.email,
                department: document.department,
                displayName: document.displayName
              });
              return post;
            }).then(function( post, handleError ) {
              if( handleError ) next( handleError );

              post.save(function( err ) {
                if( err ) next( err );
                res.json('success');
              });
            });
        });
      });
  };

  exports.topTenNews = function(req, res, next) {
    if(!req.body.postId){return res.json('postId is undefined');}
    if(!req.body.title){return res.json('title is undefined');}
    if(!req.body.department){return res.json('department is undefined');}

    node.mongoDB( node, node.config.dbName )
      .then(function() {
        var topTenNews = node.PostTopTen({
          postId: req.body.postId,
          title: req.body.title,
          department: req.body.department
        });
        return topTenNews;
      }).then(function(postTopTen, handleError) {
        if( handleError ) next( handleError );

        postTopTen.save(function( err ) {
          if( err ) next( err );
          res.json('success');
        });
      });
  };

  exports.headline = function(req, res, next) {
    if(!req.body.postId){return res.json('postId is undefined');}
    if(!req.body.title){return res.json('title is undefined');}
    if(!req.body.content){return res.json('content is undefined');}

    node.mongoDB( node, node.config.dbName )
    .then(function() {
      var headline = node.PostHeadline({
        postId: req.body.postId,
        title: req.body.title,
        content: req.body.content,
        department: req.body.department
      });
      return headline;
    }).then(function(postheadline, handleError) {
      if( handleError ) next( handleError );

      postheadline.save(function( err ) {
        if( err ) next( err );
        res.json('success');
      });
    });
  };

  exports.carousel = function(req, res, next) {
    if(!req.body.imagePath){return res.json('imagePath is undefined');}
    if(!req.body.postId){return res.json('postId is undefined');}
    if(!req.body.title){return res.json('title is undefined');}
    if(!req.body.department){return res.json('department is undefined');}
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        var carousel = node.PostCarousel({
          imagePath: req.body.imagePath,
          title: req.body.title,
          postId: req.body.postId,
          department: req.body.department
        });
        return carousel;
      }).then(function(postCarousel, handleError) {
        if( handleError ) next( handleError );

        postCarousel.save(function( err ) {
          if( err ) next( err );
          res.json('success');
        });
      });

  };

  exports.subscribe = function(req, res, next) {
    if(!req.body.email) {return res.json('email is undefined');}
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.PostSubscription
          .findOne({email: req.body.email})
          .exec(callback);

          function callback(error, postSubscription) {
            if(postSubscription) {
              node.subscribe.sendSubscription(node, req.body.email, res);
            } else {
              var postSubscribe = node.PostSubscription({
                email: req.body.email
              });
              postSubscribe.save(function( err ) {
                if( err ) next( err );
                node.subscribe.sendSubscription(node, req.body.email, res);
                //res.json('success');
              });
            }
          }
      });
  };

  exports.sendSubscribe = function(req, res, next) {
    if(!req.body.postId) {return res.json('postId is undefined');}
    node.postSubscription.send(node, req.body.postId, res);
  };
}());
