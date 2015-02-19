(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require( 'mongoose' );

  var ContactUs = new mongoose.Schema({
    firstName   : String,
    lastName    : String,
    email       : String,
    subject     : String,
    message     : String
  });

  module.exports = mongoose.model(  'ContactUs', ContactUs );
}());
