'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var actions = require('../actions/villainActions');

var FluxMixin = Fluxxor.FluxMixin(React);

var VillainForm = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {newVillain: {superName: '', realName: ''}};
  },
  handleChange: function(event) {
    event.preventDefault();

    var stateCopy = this.state;
    if (event.target.name === "newvillain-supername") 
      stateCopy.newVillain.superName = event.target.value;
    if (event.target.name === "newvillain-realname")
      stateCopy.newVillain.realName = event.target.value;

    this.setState(stateCopy);
  },
  handleSubmit: function(event) {
    event.preventDefault();

    this.getFlux().actions.addVillain(this.state.newVillain);
    this.setState({newVillain: {superName: '', realName: ''}});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="newvillain-supername">Super Name:</label>
        <input id="newvillain-supername" type="text" value={this.state.newVillain.superName} onChange={this.handleChange} name="newvillain-supername"/>
        <label htmlFor="newvillain-realname">Real Name:</label>
        <input id="newvillain-realname" type="text" value={this.state.newVillain.realName} onChange={this.handleChange} name="newvillain-realname" />
        <button type="submit">Create New Villain</button>
      </form>
    )
  }
});

module.exports = VillainForm;