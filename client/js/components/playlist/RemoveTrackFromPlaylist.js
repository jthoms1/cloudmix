/** @jsx React.DOM */
'use strict';

var React = require('react');
var PlaylistActions = require('../../actions/PlaylistActions.js');

var RemoveFromPlaylist = React.createClass({
  handleClick: function () {
    PlaylistActions.removeTrack(this.props.index);
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>Remove</button>
    );
  }
});
module.exports = RemoveFromPlaylist;
