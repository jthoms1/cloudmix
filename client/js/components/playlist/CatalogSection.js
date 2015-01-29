/** @jsx React.DOM */
'use strict';

var React = require('react');
var PlaylistStore = require('../../stores/PlaylistStore.js');
var AddTrack = require('../../components/AddTrackToPlaylist.js');
var lodash = require('lodash');

function playlistTracks() {
  return {
    ptracks: PlaylistStore.getTracks(),
    ctracks: PlaylistStore.getCatalog()
  };
}

var Catalog = React.createClass({
  getInitialState: function() {
    return playlistTracks();
  },
  componentWillMount: function() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(playlistTracks());
  },
  render: function() {
    var self = this;
    var tracks = self.state.ctracks.map(function(track, i) {
      var inPlaylist = (lodash.findIndex(self.state.ptracks, track) === -1) ? 'no' : 'yes';
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
