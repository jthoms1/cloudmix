/** @jsx React.DOM */
'use strict';

let React = require('react');
let PlaylistStore = require('../../stores/PlaylistStore.js');
let RemoveTrack = require('./RemoveTrackFromPlaylist.js');

function cartItems() {
  return {items: PlaylistStore.getTracks()};
}

let Playlist = React.createClass({
  getInitialState() {
    return cartItems();
  },
  componentWillMount() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(cartItems());
  },
  render() {
    let items = this.state.items.map(function(item, i) {
      return (
        <tr key={i}>
          <td><RemoveTrack index={i} /></td>
          <td>{item.title}</td>
        </tr>
      );
    });
    return (
      <table className="table table-hover">
        <caption>Playlist</caption>
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
    );
  }
});

module.exports = Playlist;
