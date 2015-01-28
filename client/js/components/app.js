/** @jsx React.DOM */
'use strict';

var React = require('react');
var PlaylistActions = require('../actions/PlaylistActions.js');

var APP = React.createClass({
  handleClick:function(){
    PlaylistActions.addTrack('Track 1');
  },
  render: function() {
    return <h1 onClick={this.handleClick}>My App</h1>
  }
});

module.exports = APP;

