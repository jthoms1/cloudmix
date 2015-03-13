'use strict';

let React = require('react');
let SongStore = require('../../stores/SongStore.js');
let AddSong = require('./AddSongToPlaylist.js');

let CatalogSection = React.createClass({
  render() {
    let songs = SongStore.getAll().map((song) => {
      let inPlaylist = this.props.playlist.songIds.findIndex(song.id) !== -1 ? 'yes' : 'no';
      return (
        <tr key={song.id}>
          <td><AddSong playlist={this.props.playlist} song={song} /></td>
          <td>{song.name}</td>
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
