(function() {
  'use strict';

  var cloudinary = require('cloudinary');

  var node = app_require( 'services/module.config' ),
      app  = node.express(),
      imagePath = [],

      GET_PostList = require( '../adminApImplementation/post/getIndex.js' ),
      GET_PostDepartmentList = require( '../adminApImplementation/post/getIndex.js' ),
      GETONEPOST = require( '../adminApImplementation/post/getIndex.js'),
      GETHEADLINE = require( '../adminApImplementation/post/getIndex.js'),
      GETTOPTENNEWS = require( '../adminApImplementation/post/getIndex.js'),
      GETCAROUSEL = require( '../adminApImplementation/post/getIndex.js'),
      GETUNSUBSCRIBE = require( '../adminApImplementation/post/getIndex.js'),
      GETPOSTLISTAPPROVE = require('../adminApImplementation/post/getIndex.js'),
      POST_PostOne = require( '../adminApImplementation/post/postIndex.js' ),
      POSTTOPTENNEWS = require( '../adminApImplementation/post/postIndex.js'),
      POSTHEADLINE = require( '../adminApImplementation/post/postIndex.js'),
      POSTCAROUSEL = require( '../adminApImplementation/post/postIndex.js'),
      POSTSUBSCRIBE = require( '../adminApImplementation/post/postIndex.js'),
      POSTSENDSUBSCRIBE = require( '../adminApImplementation/post/postIndex.js'),
      PUT_PostStatusOne = require( '../adminApImplementation/post/putIndex.js' ),
      PUTPOST = require( '../adminApImplementation/post/putIndex.js' ),
      DELETECAROUSEL = require( '../adminApImplementation/post/deleteIndex.js' ),
      DELETETOPTENNEWS = require( '../adminApImplementation/post/deleteIndex.js' ),
      DELETEONEPOST = require( '../adminApImplementation/post/deleteIndex.js' ),
      DELETEHEADLINE = require( '../adminApImplementation/post/deleteIndex.js' );

  app.route( '/api/post' )
    .get( GET_PostList.getPostList )
    .post( POST_PostOne.postOne )
    .put(PUTPOST.post);

  app.route('/api/post/id')
    .get(GETONEPOST.getOnePost)
    .delete(DELETEONEPOST.deleteOnePost);

  app.route( '/api/post/department' )
    .get( GET_PostDepartmentList.getPostDepartmentList );

  app.route( '/api/post/status' )
    .put( PUT_PostStatusOne.putPostStatusOne );

  app.route('/api/post/approved')
    .get(GETPOSTLISTAPPROVE.getPostListApproved);

  app.route('/api/post/toptennews')
    .get(GETTOPTENNEWS.topTenNews)
    .post(POSTTOPTENNEWS.topTenNews)
    .delete(DELETETOPTENNEWS.topTenNews);

  app.route('/api/post/headline')
    .get(GETHEADLINE.headline)
    .post(POSTHEADLINE.headline)
    .delete(DELETEHEADLINE.headline);

  app.route('/api/post/carousel')
    .get(GETCAROUSEL.carousel)
    .post(POSTCAROUSEL.carousel)
    .delete(DELETECAROUSEL.carousel);

  app.route('/api/post/subscribe')
    .post(POSTSUBSCRIBE.subscribe);

  app.route('/api/post/unsubcribe')
    .get(GETUNSUBSCRIBE.unsubscribe);

  app.route('/api/post/sendSubscribe')
    .post(POSTSENDSUBSCRIBE.sendSubscribe);

  app.route( '/api/photo' )
    .post(function( req, res, next ) {
      var imageObj = [];
      if( !req.files ) {
        res.json( {imagePath: imagePath} );
      } else {
        if(req.files.image instanceof Array) {
          for(var length in  req.files.image) {
            cloudinaryUpload( req.files.image[length].path, length,  req.files.image, res);
          }
        } else {
          imageObj.push(req.files.image);
          for(var length1 in imageObj) {
            cloudinaryUpload(imageObj[length1].path, length1, imageObj, res);
          }
        }
      }
    });

  function cloudinaryUpload(imageObj, length, imageLength, res) {
    cloudinary.uploader.upload(imageObj, function(result) {
      imagePath.push(result.url);
      ++length;
      if(imageLength.length === length) {
        res.json({imagePath: imagePath});
      }
    });
  }

  app.route('/api/upload/pdf')
    .post(function(req, res, next) {
      var pdfPath;
      if(!req.files) {
        res.json({pdfPath: pdfPath});
      } else {
        pdfPath  = req.files.image.path.split('/uploads/')[1];
        cloudinary.uploader.upload(req.files.image.path, function(result) {
          res.json( {pdfPath: result.url} );
        });
      }
    });
  module.exports = app;
}());
