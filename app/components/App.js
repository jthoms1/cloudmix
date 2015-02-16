/** @jsx React.DOM */
'use strict';

var React = require('react');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <div id="main" className="container"/>
    );
  }
});

module.exports = HelloMessage;
