'use strict';

let React = require('react');
let SongStore = require('../../stores/SongStore');
let RemoveSong = require('./RemoveSongFromPlaylist');

let PlaylistSection = React.createClass({
  render() {
    let selectedSongs = this.props.playlist.songIds
      .map(songId => SongStore.get(songId));

    let items = selectedSongs.map((song) => {
      return (
        <tr key={song.id}>
          <td><RemoveSong playlist={this.props.playlist} song={song} /></td>
          <td>{song.name}</td>
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

module.exports = PlaylistSection;
