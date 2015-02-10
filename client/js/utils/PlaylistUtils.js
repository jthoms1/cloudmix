'use strict';

let ServerActionCreators = require('../actions/PlaylistServerActionCreators');
let API = require('./ApiUtils');

module.exports = {

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songInex The unique id of the song object
   */
  create(playlist) {
    API.create('playlists', [playlist])
      .then((newPlaylists) => {
        ServerActionCreators.receiveCreated(newPlaylists);
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
   *
   */
  getAll() {
    API.get('playlists')
      .then(function (playlists) {
        ServerActionCreators.receiveAll(playlists);
      });
  },

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songId The unique id of the song object
   */
  createPlaylistSong(playlistId, songId, playlistOrder) {
    let playlistSong = {
      'playlist_id': playlistId,
      'song_id': songId,
      'playlist_order': playlistOrder
    };

    API.create('playlist_songs', [playlistSong])
      .then((newPlaylistSongs) => {
        ServerActionCreators.receiveCreatedPlaylistSongs(newPlaylistSongs);
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
