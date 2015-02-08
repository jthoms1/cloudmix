/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistActions = require('../../actions/PlaylistActionCreators');

let AddSongToPlaylist = React.createClass({
  handleClick () {
    PlaylistActions.addSong(this.props.playlistId, this.props.songId);
  },
  render () {
    return (
      <button onClick={this.handleClick}>Add</button>
    );
  }
});
module.exports = AddSongToPlaylist;