/** @jsx React.DOM */
'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <div id="main" className="container">
        </div>
        <script id="props-songs" type="application/json">
          {{{ this.props.songs }}}
        </script>
        <script id="props-playlists" type="application/json">
          {{{ this.props.playlists }}}
        </script>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
