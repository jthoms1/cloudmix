'use strict';

let ServerActionCreators = require('../actions/PlaylistServerActionCreators');
let API = require('./ApiUtils');
let converter = require('jsonapi2simple');

module.exports = {

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songInex The unique id of the song object
   */
  create(playlist) {
    playlist = converter.toJsonApi(playlist, {
      type: 'playlists'
    });
    API.create('playlists', playlist)
      .then((newPlaylists) => {
        newPlaylists = converter.toSimple(newPlaylists);
        ServerActionCreators.receiveCreated(newPlaylists);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songInex The unique id of the song object
   */
  update(playlistId, playlist) {
    playlist = converter.toJsonApi(playlist, {
      type: 'playlists'
    });
    API.update('playlists', playlist)
      .then((playlist) => {
        playlist = converter.toSimple(playlist);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songInex The unique id of the song object
   */
  destroy(playlistId) {
    API.del('playlists', [playlistId])
      .then((playlists) => {
        playlists = converter.toSimple(playlists);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   *
   */
  getAll() {
    API.get('playlists')
      .then(function (playlists) {
        playlists = converter.toSimple(playlists);
        ServerActionCreators.receiveAll(playlists);
      })
      .catch((error) => {
        console.log(error);
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

    API.create('playlistSongs', [playlistSong])
      .then((newPlaylistSongs) => {
        ServerActionCreators.receiveCreatedPlaylistSongs(newPlaylistSongs);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   * @param {string} playlistId The unique id of the playlist object
   * @param {integer} songInex The unique id of the song object
   */
  destroyPlaylistSong(playlistSongId) {
    API.del('playlistSongs', [playlistSongId])
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
