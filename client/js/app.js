/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Main = require('./components/Main');
var Playlist = require('./components/playlist/PlaylistSection');
var Catalog = require('./components/playlist/CatalogSection');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <li><Link to="app">Both</Link></li>
          <li><Link to="catalog">Catalog</Link></li>
          <li><Link to="playlist">Playlist</Link></li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="catalog" handler={Catalog}/>
    <Route name="playlist" handler={Playlist}/>
    <DefaultRoute handler={Main}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(
    <Handler/>,
    document.getElementById('main')
  );
});
