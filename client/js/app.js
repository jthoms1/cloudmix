/** @jsx React.DOM */
'use strict';

var APP = require('./components/app');
var React = require('react');

React.renderComponent(
  <APP/>,
  document.getElementById('main'));
