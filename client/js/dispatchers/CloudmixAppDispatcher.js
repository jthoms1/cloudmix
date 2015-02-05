'use strict';

let Dispatcher = require('flux').Dispatcher;
let assign = require('object-assign');

let CloudmixAppDispatcher = assign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the source.
   */
  handleAction (action) {
    let payload = {
      action
    };
    this.dispatch(payload);
  }
});

module.exports = CloudmixAppDispatcher;
