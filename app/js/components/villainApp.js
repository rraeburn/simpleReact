'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var VillainList = require('./villainList');
var VillainForm = require('./villainForm');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var VillainsApp = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('VillainStore')],
  
  getStateFromFlux: function() {
    return this.getFlux().store('VillainStore').getState();
  }, 
  render: function() {
    return (
      <main>
        <VillainForm />
        <VillainList data={this.state.villains} />
      </main>
    )
  }
});

module.exports = VillainsApp;