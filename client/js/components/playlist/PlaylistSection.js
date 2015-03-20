'use strict';

let React = require('react');
let PlaylistStore = require('../../stores/PlaylistStore');
let Link = require('react-router').Link;

function getPlaylists() {
  return {
    playlists: PlaylistStore.getAll()
  };
}

let PlaylistSection = React.createClass({
  getInitialState() {
    return getPlaylists();
  },
  componentWillMount() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PlaylistStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(getPlaylists());
  },
  render() {
    let items = this.state.playlists.map((playlist) => {
      let params = { id: playlist.id };
      return (
        <tr key={playlist.id}>
          <td><Link to="viewPlaylist" params={params}>{playlist.title}</Link></td>
        </tr>
      );
    });
    return (
      <table className="table table-hover">
        <caption>Playlists</caption>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
        <tfoot>
          <tr>
            <td><Link to="createPlaylist">Create Playlist</Link></td>
          </tr>
        </tfoot>
      </table>
    );
  }
});

module.exports = PlaylistSection;
