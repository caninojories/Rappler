(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require( 'mongoose' );

  var PostTopTenSchema = new mongoose.Schema({
    postTopTen: Array
  });

  module.exports = mongoose.model(  'PostTopTen', PostTopTenSchema );
}());
