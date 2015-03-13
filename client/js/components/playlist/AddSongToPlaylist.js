'use strict';

let React = require('react');
let PlaylistActions = require('../../actions/PlaylistActionCreators');

let AddSongToPlaylist = React.createClass({
  handleClick () {
    PlaylistActions.addSong(this.props.playlist.id, this.props.song.id);
  },
  render () {
    return (
      <button onClick={this.handleClick}>Add</button>
    );
  }
});
module.exports = AddSongToPlaylist;
