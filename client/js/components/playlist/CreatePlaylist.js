'use strict';

let React = require('react');
let PlaylistActionCreators = require('../../actions/PlaylistActionCreators');
let PlaylistStore = require('../../stores/PlaylistStore');

function getPlaylistDefaults() {
  return {
    title: null,
    description: null
  };
}

let CreatePlaylist = React.createClass({
  getInitialState() {
    return getPlaylistDefaults();
  },
  componentWillMount() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    PlaylistStore.removeChangeListener(this._onChange);
  },
  _onChange() {
  },
  _handleSubmit(e) {
    e.preventDefault();
    var newPlaylist = {
      title: this.refs.title.getDOMNode().value.trim(),
      description: this.refs.description.getDOMNode().value.trim()
    };
    PlaylistActionCreators.create(newPlaylist);
  },
  render() {
    return (
      <form className="playlistForm" onSubmit={this._handleSubmit}>
        <input type="text" placeholder="Your Playlist Title" ref="title" />
        <input type="text" placeholder="Your Playlist Description" ref="description" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

module.exports = CreatePlaylist;
