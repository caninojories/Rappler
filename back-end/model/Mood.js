(function() {
  'use strict';

  var mongoose      = require( 'mongoose' );

  var MoodSchema = new mongoose.Schema({
    postId: String,
    userId: String,
    mood: String
  });

  module.exports = mongoose.model('Mood', MoodSchema);
}());
