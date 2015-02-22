(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require( 'mongoose' );

  var PostHeadlineSchema = new mongoose.Schema({
    postId: String,
    title: String,
    content: String,
    department: String
  });

  module.exports = mongoose.model(  'PostHeadline', PostHeadlineSchema );
}());
