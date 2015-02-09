(function() {
  'use strict';

    var node = app_require( 'services/module.config' ),
        app  = node.express(),

        POSTONECOMMENT = require('../adminApImplementation/comment/postIndex.js');

    app.route('/api/post/comment')
      .post(POSTONECOMMENT.postOneComment);

}());
