/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistStore = require('../../stores/PlaylistStore.js');
let CatalogStore = require('../../stores/CatalogStore.js');
let AddTrack = require('./AddTrackToPlaylist.js');

function songLists() {
  return {
    playlistSongs: PlaylistStore.getPlaylistSongs(),
    catalogSongs: CatalogStore.getSongs()
  };
}

let Catalog = React.createClass({
  getInitialState() {
    return songLists(this.props.playlistId);
  },
  componentWillMount() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(songLists(this.props.playlistId));
  },
  render() {
    let self = this;
    let playlist = self.props.playlist;
    let songs = self.state.catalogSongs.map(function(song, i) {
      let inPlaylist = (self.state.playlistSongs.findIndex(song) === -1) ? 'no' : 'yes';
      return (
        <tr key={i}>
          <td><AddTrack playlist={playlist} song={song} /></td>
          <td>{song.title}</td>
          <td>{inPlaylist}</td>
        </tr>
      );
    });
    return (
      <table className="table table-hover">
        <caption>Catalog</caption>
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>In Playlist</th>
          </tr>
        </thead>
        <tbody>
          {songs}
        </tbody>
      </table>
    );
  }
});

module.exports = Catalog;
