'use strict';

let PlaylistActionCreators = require('../actions/PlaylistActionCreators');
let API = require('./ApiUtils');

module.exports = {

  getPlaylists() {
    API.get('playlists')
      .then(function (playlists) {
        PlaylistActionCreators.receiveAll(playlists);
      });
  },

  addPlaylistSong(song, playlist) {
    let playlistSong = {
      'playlist_id': playlist.id,
      'song_id': song.id,
      'playlist_order': playlist.length
    };

    API.create('playlist_songs', playlistSong)
      .then(function (newPlaylistSong) {
        PlaylistActionCreators.receiveCreatedPlaylistSong(newPlaylistSong);
      });
  },

  removePlaylistSong(playlistSong) {
    API.del('playlist_songs', playlistSong)
      .then(function () {
      });
  }
};
