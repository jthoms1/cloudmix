'use strict';

let CloudmixConstants = require('../constants/CloudmixConstants');
let Dispatcher = require('flux').Dispatcher;
let assign = require('object-assign');

const PayloadSources = CloudmixConstants.PayloadSources;

let CloudmixAppDispatcher = assign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */
  handleServerAction (action) {
    let payload = {
      source: PayloadSources.SERVER_ACTION,
      action
    };
    this.dispatch(payload);
  },

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction (action) {
    let payload = {
      source: PayloadSources.VIEW_ACTION,
      action
    };
    this.dispatch(payload);
  }
});

module.exports = CloudmixAppDispatcher;
