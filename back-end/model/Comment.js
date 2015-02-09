(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require( 'mongoose' );

  var CommentSchema = new mongoose.Schema({
    postId: String,
    userId: String,
    content: String,
    date: {
      type: Date,
      default: Date.now
    },
  });

  module.exports = mongoose.model(  'Comment', CommentSchema );
}());
