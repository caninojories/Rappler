(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require( 'mongoose' );

  var PostCarouselSchema = new mongoose.Schema({
    imagePath: Array,
    title: String,
    postId: String,
    department: String,
    createdAt: {
      type: Date,
      default: Date.now()
    }
  });

  module.exports = mongoose.model(  'PostCarousel', PostCarouselSchema );
}());
