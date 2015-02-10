/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistSection = require('./playlist/PlaylistSection');
let CatalogSection = require('./playlist/CatalogSection');

let Main = React.createClass({
  render () {
    return (
      <div>
        <PlaylistSection playlistId={2}/>
        <CatalogSection playlistId={2}/>
      </div>
    );
  }
});

module.exports = Main;
