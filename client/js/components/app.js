/** @jsx React.DOM */
'use strict';

var React = require('react');
var PlaylistSection = require('./PlaylistSection');
var CatalogSection = require('./CatalogSection');

var APP = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Playlist</h1>
        <PlaylistSection/>
        <h1>Catalog</h1>
        <CatalogSection/>
      </div>
    );
  }
});

module.exports = APP;

