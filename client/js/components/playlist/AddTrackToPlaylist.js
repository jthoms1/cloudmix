/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistActions = require('../../actions/PlaylistActions.js');

let AddToPlaylist = React.createClass({
  handleClick () {
    PlaylistActions.addTrack(this.props.track);
  },
  render () {
    return (
      <button onClick={this.handleClick}>Add</button>
    );
  }
});
module.exports = AddToPlaylist;
