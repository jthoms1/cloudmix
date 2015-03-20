'use strict';

let React = require('react');
let SongStore = require('../../stores/SongStore.js');

let CatalogSection = React.createClass({
  render() {
    let songs = SongStore.getAll().map((song) => {
      return (
        <tr key={song.id}>
          <td>{song.name}</td>
        </tr>
      );
    });
    return (
      <table className="table table-hover">
        <caption>Catalog</caption>
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {songs}
        </tbody>
      </table>
    );
  }
});

module.exports = CatalogSection;
