/** @jsx React.DOM */
'use strict';

var React = require('react');
var PlaylistStore = require('../stores/PlaylistStore.js');
var RemoveTrack = require('../components/RemoveTrackFromPlaylist.js');

function cartItems() {
  return {items: PlaylistStore.getTracks()};
}

var Playlist = React.createClass({
  getInitialState:function(){
    return cartItems();
  },
  componentWillMount:function(){
    PlaylistStore.addChangeListener(this._onChange);
  },
  _onChange:function(){
    this.setState(cartItems());
  },
  render:function(){
    var items = this.state.items.map(function(item, i){
      return (
        <tr key={i}>
          <td><RemoveTrack index={i} /></td>
          <td>{item.title}</td>
        </tr>
      );
    });
    return (
      <table className="table table-hover">
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
