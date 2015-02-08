(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

      GET_PostList = require( '../adminApImplementation/post/getIndex.js' ),
      GET_PostDepartmentList = require( '../adminApImplementation/post/getIndex.js' ),
      GETONEPOST = require( '../adminApImplementation/post/getIndex.js'),
      GETPOSTLISTAPPROVE = require('../adminApImplementation/post/getIndex.js'),
      POST_PostOne = require( '../adminApImplementation/post/postIndex.js' ),
      PUT_PostStatusOne = require( '../adminApImplementation/post/putIndex.js' );

  app.route( '/api/post' )
    .get( GET_PostList.getPostList )
    .post( POST_PostOne.postOne );

  app.route('/api/post/id')
    .get(GETONEPOST.getOnePost);

  app.route( '/api/post/department' )
    .get( GET_PostDepartmentList.getPostDepartmentList );

  app.route( '/api/post/status' )
    .put( PUT_PostStatusOne.putPostStatusOne );

  app.route('/api/post/approved')
    .get(GETPOSTLISTAPPROVE.getPostListApproved);

  module.exports = app;
}());
