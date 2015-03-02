(function() {
  'use strict';

  var mongoose      = require( 'mongoose' );

  var AboutUschema = new mongoose.Schema({
    title: String,
    content: String,
    tag: String
  });

  module.exports = mongoose.model('AboutUs', AboutUschema);
}());
