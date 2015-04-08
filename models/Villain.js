'use strict';

var mongoose = require('mongoose');

var villainSchema = new mongoose.Schema({
  superName: String
});

module.exports = mongoose.model('Villain', villainSchema);