'use strict';

let React = require('react');
let PlaylistStore = require('../../stores/PlaylistStore');
let PlaylistSection = require('./PlaylistSection');
let CatalogSection = require('./CatalogSection');

function getPlaylist(playlistId) {
  return PlaylistStore.get(playlistId);
}

let Main = React.createClass({
  getInitialState() {
    return getPlaylist(this.props.playlistId);
  },
  componentWillMount() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(getPlaylist(this.props.playlistId));
  },
  render () {
    let playlist = this.state.playlist;
    return (
      <div className="parent">
        <PlaylistSection className="child" playlist={playlist}/>
        <CatalogSection className="child" playlist={playlist}/>
      </div>
    );
  }
});

module.exports = Main;
