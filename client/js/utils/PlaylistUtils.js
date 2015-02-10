'use strict';

let PlaylistActionCreators = require('../actions/PlaylistActionCreators');
let API = require('./ApiUtils');

module.exports = {

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songInex The unique id of the song object
   */
  create(playlist) {
    API.create('playlists', [playlist])
      .then((newPlaylist) => {
        PlaylistActionCreators.receiveCreatedPlaylists(newPlaylist);
      });
  },

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songInex The unique id of the song object
   */
  update(playlistId, playlist) {
    API.update('playlists', [playlist])
      .then(() => {
      });
  },

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songInex The unique id of the song object
   */
  destroy(playlistId) {
    API.del('playlists', [playlistId])
      .then(() => {
      });
  },

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songInex The unique id of the song object
   */
  getPlaylists() {
    API.get('playlists')
      .then(function (playlists) {
        PlaylistActionCreators.receiveAll(playlists);
      });
  },

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songInex The unique id of the song object
   */
  createPlaylistSong(playlistId, songId, playlistOrder) {
    let playlistSong = {
      'playlist_id': playlistId,
      'song_id': songId,
      'playlist_order': playlistOrder
    };

    API.create('playlist_songs', [playlistSong])
      .then((newPlaylistSongs) => {
        PlaylistActionCreators.receiveCreatedPlaylistSongs(newPlaylistSongs);
      });
  },

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songInex The unique id of the song object
   */
  destroyPlaylistSong(playlistSongId) {
    API.del('playlist_songs', [playlistSongId])
      .then(() => {
      });
  }
};
