(function() {
  'use strict';

  module.exports = function(node, dbName) {
    if (node.mongoose.connection.readyState !== 1) {
      var db = node.Promise.all([node.mongoose.connect(process.env.MONGOLAB_URI)]);
      return db;
    } else {
      return node.Promise.all([node.mongoose]);
    }
  };

}());
