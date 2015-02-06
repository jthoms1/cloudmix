/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistActions = require('../../actions/PlaylistActions.js');

let AddToPlaylist = React.createClass({
  handleClick () {
    PlaylistActions.addPlaylistSong(this.props.playlist, this.props.song);
  },
  render () {
    return (
      <button onClick={this.handleClick}>Add</button>
    );
  }
});
module.exports = AddToPlaylist;
