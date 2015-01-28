/** @jsx React.DOM */
'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello {this.props.name}</div>
        <div id="main" className="container"></div>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
