/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistStore = require('../../stores/PlaylistStore.js');
let AddTrack = require('./AddTrackToPlaylist.js');
let lodash = require('lodash');

function playlistTracks () {
  return {
    ptracks: PlaylistStore.getTracks(),
    ctracks: PlaylistStore.getCatalog()
  };
}

let Catalog = React.createClass({
  getInitialState () {
    return playlistTracks();
  },
  componentWillMount () {
    PlaylistStore.addChangeListener(this._onChange);
  },
  _onChange () {
    this.setState(playlistTracks());
  },
  render () {
    let self = this;
    let tracks = self.state.ctracks.map(function(track, i) {
      let inPlaylist = (lodash.findIndex(self.state.ptracks, track) === -1) ? 'no' : 'yes';
      return (
        <tr key={i}>
          <td><AddTrack track={track} /></td>
          <td>{track.title}</td>
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
          {tracks}
        </tbody>
      </table>
    );
  }
});

module.exports = Catalog;
