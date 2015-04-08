'use strict';

var Fluxxor = require('fluxxor');
var request = require('superagent');
var constants = require('../constants/villainConstants');

var baseUrl = '/api/v1/villains';

var VillainStore = Fluxxor.createStore({
  initialize: function() {
    this.villains = [];

    this.bindActions(
      constants.ADD_VILLAIN, this.onNewVillain,
      constants.REMOVE_VILLAIN, this.onRemoveVillain
    );

    request
      .get(baseUrl)
      .end(function(err,res) {
        if(err) return console.log(err);

        this.villains = res.body;
        this.emit('change');
      }.bind(this));
  },

  onNewVillain: function(villain) {
    request
      .post(baseUrl)
      .send(villain)
      .end(function(err, res) {
        if(err) return console.log(err);

        this.villains.push(res.body);
        this.emit('change');
      }.bind(this));
  },

  onRemoveVillain: function(villain) {
    request
      .del(baseUrl + '/' + villain._id)
      .end(function(err, res) {
        if(err) return console.log(err);

        this.villains.splice(this.villains.indexOf(villain), 1);
        this.emit('change');
      }.bind(this));
  },

  getState: function() {
    return {villains: this.villains};
  }
});

module.exports = VillainStore;