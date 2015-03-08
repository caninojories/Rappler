(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require( 'mongoose' );

  var PostTopTenSchema = new mongoose.Schema({
    postId: String,
    title: String,
    department: String,
    createdAt: {
      type: Date,
      default: Date.now()
    }
  });

  module.exports = mongoose.model(  'PostTopTen', PostTopTenSchema );
}());
