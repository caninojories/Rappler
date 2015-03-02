(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require( 'mongoose' );

  var ContactSchema = new mongoose.Schema({
    street    : String,
    barangay  : String,
    city      : String,
    province  : String,
    content   : String,
    contact   : String
  });

  module.exports = mongoose.model('Contact', ContactSchema);
}());
