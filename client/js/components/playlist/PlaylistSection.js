/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistStore = require('../../stores/PlaylistStore.js');
let RemoveTrack = require('./RemoveTrackFromPlaylist.js');

function playlistSongs(playlistId) {
  return {items: PlaylistStore.getPlaylistSongs(playlistId)};
}

let Playlist = React.createClass({
  getInitialState() {
    return playlistSongs(this.props.playlistId);
  },
  componentWillMount() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(playlistSongs(this.props.playlistId));
  },
  render() {
    let items = this.state.items.map(function(item, i) {
      return (
        <tr key={i}>
          <td><RemoveTrack playlistSong={item} /></td>
          <td>{item.title}</td>
        </tr>
      );
    });
    return (
      <table className="table table-hover">
        <caption>Playlist</caption>
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
    );
  }
});

module.exports = Playlist;
