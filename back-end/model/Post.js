(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require( 'mongoose' );

  var PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    status: String,
    imagePath: String,
    pdfPath : String,
    date: {
      type: Date,
      default: Date.now
    },
    email: String,
    department: String,
    displayName: String
  });

  module.exports = mongoose.model(  'Post', PostSchema );
}());
