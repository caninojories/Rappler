(function() {
  'use strict';

  var mongoose      = require( 'mongoose' );

  var MoodCountSchema = new mongoose.Schema({
    postId: String,
    happy: Number,
    sad: Number,
    annoyed: Number,
    inspired: Number,
    afraid: Number
  });

  module.exports = mongoose.model('MoodCount', MoodCountSchema);
}());
