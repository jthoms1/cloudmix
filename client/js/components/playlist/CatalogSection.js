/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistStore = require('../../stores/PlaylistStore.js');
let SongStore = require('../../stores/SongStore.js');
let AddSong = require('./AddSongToPlaylist.js');

function songLists(playlistId) {
  return {
    playlistSongs: PlaylistStore.get(playlistId),
    catalogSongs: SongStore.getAll()
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
    let songs = this.state.catalogSongs.map((song, i) => {
      let inPlaylist = (this.state.playlistSongs.findIndex(song) === -1) ? 'no' : 'yes';
      return (
        <tr key={i}>
          <td><AddSong playlistId={this.props.playlistId} songId={song.id} /></td>
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
