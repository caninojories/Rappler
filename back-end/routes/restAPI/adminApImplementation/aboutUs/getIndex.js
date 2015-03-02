(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getAboutUs = function(req, res, next) {
    var query = node.url.parse( req.url ,true).query;
    /*postId = getting for list of comment in a certain Post*/
    /**sort = can be used for descending in getting the pending
    ** comment or can be use in sorting the latest comment in the post
    **/
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.AboutUs
          .findOne()
          .exec(callback);

          function callback(error, aboutus) {
            res.json(aboutus);
          }
      });
  };
}());
