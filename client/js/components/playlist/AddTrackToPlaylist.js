/** @jsx React.DOM */
'use strict';

var React = require('react');
var PlaylistActions = require('../../actions/PlaylistActions.js');

var AddToPlaylist = React.createClass({
  handleClick: function() {
    PlaylistActions.addTrack(this.props.track);
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>Add</button>
    );
  }
});
module.exports = AddToPlaylist;
