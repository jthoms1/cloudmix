/** @jsx React.DOM */
'use strict';

var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          {this.props.children}
          <script src="/js/app.js"></script>
        </body>
      </html>
    );
  }
});

module.exports = DefaultLayout;
