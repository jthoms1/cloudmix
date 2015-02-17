/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistSection = require('./PlaylistSection');
let CatalogSection = require('./CatalogSection');

let Main = React.createClass({
  render () {
    let playlistId = 2;
    return (
      <div className="parent">
        <PlaylistSection className="child" playlistId={playlistId}/>
        <CatalogSection className="child" playlistId={playlistId}/>
      </div>
    );
  }
});

module.exports = Main;
