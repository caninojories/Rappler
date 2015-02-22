(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require( 'mongoose' );

  var PostSubscriptionSchema = new mongoose.Schema({
    email: String
  });

  module.exports = mongoose.model(  'PostSubscription', PostSubscriptionSchema );
}());
