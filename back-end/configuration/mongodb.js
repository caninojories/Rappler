(function() {
  'use strict';

  module.exports = function(node, dbName) {
    if (node.mongoose.connection.readyState !== 1) {
      var db = node.Promise.all([node.mongoose.connect('mongodb://rappler:haurappler@ds039431.mongolab.com:39431/rappler')]);
      return db;
    } else {
      return node.Promise.all([node.mongoose]);
    }
  };

}());
