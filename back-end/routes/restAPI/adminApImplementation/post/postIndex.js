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
}());
