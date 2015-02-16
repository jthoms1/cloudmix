'use strict';

var Playlist = require('../../models/playlist');
var Song = require('../../models/song');
var BPromise = require('bluebird');
var React = require('React');
var App = require('../components/App');

exports.index = function(req, res) {
  BPromise.all([
      Playlist.fetchAll(),
      Song.fetchAll()
    ])
    .then(function(data) {
      /*
       * Set playlists and songs as properties of App Component
       * then Render App Component to a String
       */
      var props = {
        playlists: data[0].toJSON(),
        songs: data[1].toJSON()
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
