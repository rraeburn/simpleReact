'use strict';

var React = require('react');
var ajax = require('jquery').ajax;

var VillainForm = React.createClass({
  getInitialState: function() {
    return {newVillain: {superName: ''}};
  },
  handleChange: function() {
    this.setState({newVillain: {superName: event.target.value}});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var newVillain = this.state.newVillain;
    ajax({
      url: this.props.url,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(newVillain),
      success: function(data) {
        this.props.onNewVillainSubmit(data);
        this.setState({newVillain: {superName: ''}});
      }.bind(this),
      error:function(xhr, status, err) {
        console.log(err);
      }
    });
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="newvillain">New Villain</label>
        <input id="newvillain" type="text" value={this.state.newVillain.superName} onChange={this.handleChange} />
        <button type="submit">Create New Villain</button>
      </form>
    )
  }
});

var Villain = React.createClass({
  render: function() {
    return <li>{this.props.data.superName}</li>
  }
});

var VillainList = React.createClass({
  render: function() {
    var villains = this.props.data.map(function(villain) {
      if(villain.editing) {
        return <EditVillain data={villain} key={villain._id} />
      }
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

var VillainsApp = React.createClass({
  getInitialState: function() {
    return {villainsData: []};
  },
  onNewVillain: function(villain) {
    villain._id = this.state.villainsData.length + 1;
    var stateCopy = this.state;
    stateCopy.villainsData.push(villain);
    this.setState(stateCopy);
  },
  componentDidMount: function() {
    ajax({
      url: this.props.villainsBaseUrl,
      dataType: 'json',
      success: function(data) {
        var state = this.state;
        state.villainsData = data;
        this.setState(state);
      }.bind(this),
      error: function(xhr, status) {
        console.log(xhr, status);
      }
    });
  },
  render: function() {
    return (
      <main>
        <VillainForm onNewVillainSubmit={this.onNewVillain} url={this.props.villainsBaseUrl}/>
        <VillainList data={this.state.villainsData} />
      </main>
    )
  }
});

React.render(<VillainsApp villainsBaseUrl ={'/api/v1/villains'}/>, document.body);