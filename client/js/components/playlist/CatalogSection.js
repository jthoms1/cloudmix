/** @jsx React.DOM */
'use strict';

let React = require('react');
let PureRenderMixin = require('react/addons').addons.PureRenderMixin;
let PlaylistStore = require('../../stores/PlaylistStore.js');
let SongStore = require('../../stores/SongStore.js');
let AddSong = require('./AddSongToPlaylist.js');

function getState(playlistId) {
  return {
    playlist: PlaylistStore.get(playlistId),
    songs: SongStore
  };
}

let CatalogSection = React.createClass({
  mixins: [PureRenderMixin],
  componentWillMount() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  getInitialState() {
    return getState(this.props.playlistId);
  },
  _onChange() {
    this.setState(getState(this.props.playlistId));
  },
  render() {
    let playlistSongs = this.state.playlist.getIn(['links', 'songs']);
    let allSongs = this.state.songs.getAll();

    let songs = allSongs.map((song, i) => {
      let songId = song.get('id');
      let inPlaylist = playlistSongs.contains(songId) ? 'yes' : 'no';
      return (
        <tr key={i}>
          <td><AddSong playlistId={this.props.playlistId} songId={songId} /></td>
          <td>{song.get('name')}</td>
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
