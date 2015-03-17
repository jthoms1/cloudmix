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
    PlaylistStore.addChangeListener(this._onSave);
  },
  componentWillUnmount() {
    PlaylistStore.removeChangeListener(this._onSave);
  },
  _onSave() {

  },
  _handleSubmit(e) {
    e.preventDefault();
    this.setState({
      title: React.findDOMNode(this.refs.title).value.trim(),
      description: React.findDOMNode(this.refs.description).value.trim()
    });
    PlaylistActionCreators.create(this.state);
  },
  render() {
    return (
      <form className="playlistForm" onSubmit="{this._handleSubmit}">
        <input type="text" placeholder="Your Playlist Title" ref="title" />
        <input type="text" placeholer="Your Playlist Description" ref="description" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

module.exports = CreatePlaylist;
