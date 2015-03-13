'use strict';

let React = require('react');
let PlaylistActions = require('../../actions/PlaylistActionCreators.js');

let RemoveSongFromPlaylist = React.createClass({
  handleClick () {
    PlaylistActions.removeSong(this.props.playlist.id, this.props.song.id);
  },
  render () {
    return (
      <button onClick={this.handleClick}>Remove</button>
    );
  }
});

module.exports = RemoveSongFromPlaylist;
