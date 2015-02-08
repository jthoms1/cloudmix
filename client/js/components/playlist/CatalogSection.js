/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistStore = require('../../stores/PlaylistStore.js');
let SongStore = require('../../stores/SongStore.js');
let AddTrack = require('./AddTrackToPlaylist.js');

function songLists(playlistId) {
  return {
    playlistSongs: PlaylistStore.getPlaylist(playlistId),
    catalogSongs: SongStore.getSongs()
  };
}

let CatalogSection = React.createClass({
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
    let playlist = self.props.playlist;
    let songs = self.state.catalogSongs.map((song, i) => {
      let inPlaylist = (this.state.playlistSongs.findIndex(song) === -1) ? 'no' : 'yes';
      return (
        <tr key={i}>
          <td><AddTrack playlistId={playlist.id} songId={song.id} /></td>
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

module.exports = CatalogSection;
