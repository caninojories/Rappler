(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getCommentList = function(req, res, next) {
    var query = node.url.parse( req.url ,true).query;
    /*postId = getting for list of comment in a certain Post*/
    /**sort = can be used for descending in getting the pending
    ** comment or can be use in sorting the latest comment in the post
    **/
    var find = null;
    if(query.status) {
      find = {
        status: query.status
      };
    } else if (query.postId) {
      find = {
        postId: query.postId
      };
    }
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.Comment
          .find(find)
          .sort({date: query.sort || -1})
          .exec(callback);

          function callback(error, comment) {
            res.json(comment);
          }
      });
  };
}());
