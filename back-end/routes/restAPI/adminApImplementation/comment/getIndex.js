(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getCommentList = function(req, res, next) {
    var query = node.url.parse( req.url ,true).query;
    // var status = {};
    // if (query.status) {status = query.status;}
    console.log(query.status);
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.Comment
          .find({status: query.status || {}})
          .exec(callback);

          function callback(error, comment) {
            res.json(comment);
          }
      });
  };
}());
