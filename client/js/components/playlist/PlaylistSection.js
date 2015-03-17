'use strict';

let React = require('react');
let Router = require('react-router');
let SongStore = require('../../stores/SongStore');
let PlaylistStore = require('../../stores/PlaylistStore');
let RemoveSong = require('./RemoveSongFromPlaylist');

function getPlaylist(playlistId) {
  playlistId = parseInt(playlistId, 10);
  return {
    playlist: PlaylistStore.get(playlistId)
  };
}

let PlaylistSection = React.createClass({
  mixins: [Router.State],
  getInitialState() {
    return getPlaylist(this.getParams().id);
  },
  componentWillMount() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PlaylistStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(getPlaylist(this.getParams().id));
  },
  render() {
    let selectedSongs = this.state.playlist.songIds
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
