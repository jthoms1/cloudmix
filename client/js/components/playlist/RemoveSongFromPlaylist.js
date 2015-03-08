/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistActions = require('../../actions/PlaylistActionCreators.js');

let RemoveSongFromPlaylist = React.createClass({
  handleClick () {
    PlaylistActions.removeSong(this.props.playlistId, this.props.songIndex);
  },
  render () {
    return (
      <button onClick={this.handleClick}>Remove</button>
    );
  }
});
module.exports = RemoveSongFromPlaylist;
