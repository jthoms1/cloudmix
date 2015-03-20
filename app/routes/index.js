'use strict';

var Playlist = require('../../models/playlist');
var Song = require('../../models/song');
var BPromise = require('bluebird');
var React = require('React');
var App = require('../components/App');
var converter = require('jsonapi2simple');

exports.index = function(req, res) {
  BPromise.all([
      Playlist.fetchAll({
        withRelated: 'playlistSongs'
      }),
      Song.fetchAll()
    ])
    .then(function(data) {
      /*
       * Set playlists and songs as properties of App Component
       * then Render App Component to a String
       */
      var props = {
        playlists: converter.toJsonApi(data[0].toJSON(), {
          type: 'playlists',
          baseUrl: '/api'
        }),
        songs: converter.toJsonApi(data[1].toJSON(), {
          type: 'songs',
          baseUrl: '/api'
        })
      };
      var pageContent = React.renderToString(
        <App playlists={props.playlists} songs={props.songs} />
      );

      /*
       *  Send html with page contents injected.
       */
      res.send('<html>' +
        '  <head>' +
        '    <title></title>' +
        '    <link rel="stylesheet" type="text/css" href="/css/main.css" media="screen" />' +
        '  </head>' +
        '  <body>' +
        '    ' + pageContent +
        '    <script>' +
        '      window.__DATA__ = {};' +
        '      window.__DATA__.playlists = ' + JSON.stringify(props.playlists) + ';' +
        '      window.__DATA__.songs = ' + JSON.stringify(props.songs) + ';' +
        '    </script>' +
        '    <script src="/js/app.js"></script>' +
        '  </body>' +
        '</html>');
    });
};
