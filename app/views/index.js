/** @jsx React.DOM */
'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default');
var Main = require('../../client/js/components/Main');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <div id="main" className="container">
          <Main/>
        </div>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
