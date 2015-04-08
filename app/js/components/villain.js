'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var actions = require('../actions/villainActions');

var FluxMixin = Fluxxor.FluxMixin(React);

var Villain = React.createClass({
  mixins: [FluxMixin],
  handleDelete: function() {
    this.getFlux().actions.deleteVillain(this.props.data);
  },
  render: function() {
    return <li><span>{this.props.data.realName + ' aka: '}</span>{this.props.data.superName}<button onClick={this.handleDelete}>Delete</button></li>
  }
});

module.exports = Villain;