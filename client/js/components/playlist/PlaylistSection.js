/** @jsx React.DOM */
'use strict';

let React = require('react');
let PureRenderMixin = require('react/addons').addons.PureRenderMixin;
let PlaylistStore = require('../../stores/PlaylistStore');
let SongStore = require('../../stores/SongStore');
let RemoveSong = require('./RemoveSongFromPlaylist');

function playlistSongs(playlistId) {
  return {
    playlist: PlaylistStore.get(playlistId),
    songs: SongStore
  };
}

let PlaylistSection = React.createClass({
  mixins: [PureRenderMixin],
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
    let selectedSongs = this.state.playlist
      .getIn(['links', 'songs'])
      .map(songId => this.state.songs.get(songId));

    let items = selectedSongs.map((song, index) => {
      return (
        <tr key={index}>
          <td><RemoveSong playlistId={this.props.playlistId} songIndex={index} /></td>
          <td>{song.get('name')}</td>
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
