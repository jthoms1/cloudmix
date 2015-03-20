'use strict';

let React = require('react');
let PlaylistActionCreators = require('../../actions/PlaylistActionCreators');
let PlaylistStore = require('../../stores/PlaylistStore');
let State = require('react-router').State;

function getPlaylist(playlistId) {
  playlistId = parseInt(playlistId, 10);
  return {
    playlist: PlaylistStore.get(playlistId)
  };
}

let ViewPlaylist = React.createClass({
  mixins: [ State ],
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
  _handleSubmit(e) {
    e.preventDefault();
  },
  render() {
    return (
      <form className="playlistForm" onSubmit={this._handleSubmit}>
        <input type="text" placeholder="Your Playlist Title" ref="title" value={this.state.playlist.title} />
        <input type="text" placeholder="Your Playlist Description" ref="description" value={this.state.playlist.description} />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

module.exports = ViewPlaylist;
