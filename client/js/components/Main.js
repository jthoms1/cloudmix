/** @jsx React.DOM */
'use strict';

var React = require('react');
var PlaylistSection = require('./playlist/PlaylistSection');
var CatalogSection = require('./playlist/CatalogSection');

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <PlaylistSection/>
        <CatalogSection/>
      </div>
    );
  }
});

module.exports = Main;
