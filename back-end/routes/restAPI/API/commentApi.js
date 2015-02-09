(function() {
  'use strict';

    var node = app_require( 'services/module.config' ),
        app  = node.express(),

        GETCOMMENTLIST      = require('../adminApImplementation/comment/getIndex.js'),
        POSTONECOMMENT      = require('../adminApImplementation/comment/postIndex.js'),
        PUTONECOMMENTSTATUS = require('../adminApImplementation/comment/putIndex.js');

    app.route('/api/post/comment')
      .get(GETCOMMENTLIST.getCommentList)
      .post(POSTONECOMMENT.postOneComment)
      .put(PUTONECOMMENTSTATUS.putOneCommentStatus);

    module.exports = app;
}());
