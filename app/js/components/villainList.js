'use strict';

var React = require('react');
var Villain = require('./villain');

var VillainList = React.createClass({
  render: function() {
    var villains = this.props.data.map(function(villain) {
      return <Villain data={villain} key={villain._id} />
    });
    return (
      <section>
        <h1>Villains:</h1>
          <ul>
            {villains}
          </ul>
      </section>
    )
  }
});

module.exports = VillainList;