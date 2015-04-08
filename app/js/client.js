'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var VillainStore = require('./stores/villainStore');
var constants = require('./constants/villainConstants');
var actions = require('./actions/villainActions');

//components
var VillainForm = require('./components/villainForm');
var Villain = require('./components/villain');
var VillainList = require('./components/villainList');
var VillainsApp = require('./components/villainApp');

var stores = {
  VillainStore: new VillainStore()
};
var flux = new Fluxxor.Flux(stores, actions);

React.render(<VillainsApp flux={flux}/>, document.body);