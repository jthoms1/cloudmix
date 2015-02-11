/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistSection = require('./playlist/PlaylistSection');
let CatalogSection = require('./playlist/CatalogSection');

let Main = React.createClass({
  render () {
    let playlistId = 2;
    return (
      <div>
        <PlaylistSection playlistId={playlistId}/>
        <CatalogSection playlistId={playlistId}/>
      </div>
    );
  }
});

module.exports = Main;
