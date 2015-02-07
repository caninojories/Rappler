(function() {
  'use strict';

  var mongoose      = require( 'mongoose' );

  var MoodSchema = new mongoose.Schema({
    postId: Number,
    userId: Number,
    mood: String
  });

  module.exports = mongoose.model('Mood', MoodSchema);
}());
