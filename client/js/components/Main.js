/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistSection = require('./playlist/PlaylistSection');
let CatalogSection = require('./playlist/CatalogSection');

let Main = React.createClass({
  render () {
    return (
      <div>
        <PlaylistSection/>
        <CatalogSection/>
      </div>
    );
  }
});

module.exports = Main;
