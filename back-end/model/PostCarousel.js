(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require( 'mongoose' );

  var PostCarouselSchema = new mongoose.Schema({
    carousel: Object,
    department: String
  });

  module.exports = mongoose.model(  'PostCarousel', PostCarouselSchema );
}());
