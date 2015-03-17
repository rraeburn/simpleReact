var constants = require('../constants/villainConstants');

var actions = {
  addVillain: function(villain) {
    this.dispatch(constants.ADD_VILLAIN, villain);
  },

  deleteVillain: function(villain) {
    this.dispatch(constants.REMOVE_VILLAIN, villain);
  }
};

module.exports = actions;