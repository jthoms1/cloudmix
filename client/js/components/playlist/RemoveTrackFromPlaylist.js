/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistActions = require('../../actions/PlaylistActions.js');

let RemoveFromPlaylist = React.createClass({
  handleClick () {
    PlaylistActions.removePlaylistSong(this.props.playlistSong);
  },
  render () {
    return (
      <button onClick={this.handleClick}>Remove</button>
    );
  }
});
module.exports = RemoveFromPlaylist;
