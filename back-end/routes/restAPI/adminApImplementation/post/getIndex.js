(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getPostList = function( req, res, next ) {
    var query = node.url.parse( req.url ,true).query;
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .find()
          .skip(query.skip)
          .limit(query.limit)
          .exec( documents );

          function documents( handleError , documentList ) {
            if( handleError ) next( handleError );
            res.status(200).send( documentList );
          }
      });
  };
}());
