/** @jsx React.DOM */
var React = require('react-tools').React;
var DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello {this.props.name}</div>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
