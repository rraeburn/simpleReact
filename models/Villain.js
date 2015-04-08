'use strict';

var mongoose = require('mongoose');

var villainSchema = new mongoose.Schema({
  superName: String,
  realName: {type: String, default: 'Unknown'}
});

module.exports = mongoose.model('Villain', villainSchema);