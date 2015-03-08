(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.putPostStatusOne = function( req, res, next ) {
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .findById(req.body.id, documents );

          function documents( handleError, document ) {
            document.status = req.body.status;
            document.save(function( err ) {
              if( err ) next( err );
              res.json( 'success' );
            });
          }
      });
  };

  exports.post = function(req, res, next) {
    if(!req.body.id) {return res.json('id is not defined');}
    if(!req.body.title) {return res.json('title is not defined');}
    if(!req.body.content) {return res.json('content is not defined');}
    if(!req.body.imagePath) {return res.json('imagePath is not defined');}

    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .findById(req.body.id, documents );

          function documents( handleError, document ) {
            document.title = req.body.title;
            document.content  = req.body.content;
            document.imagePath = req.body.imagePath;
            // document.pdfPath  = req.body.pdfPath;
            document.save(function( err ) {
              if( err ) next( err );
              res.json( 'success' );
            });
          }
      });
  };

}());
