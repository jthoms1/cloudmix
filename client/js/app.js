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
var SongServerActionCreators = require('./actions/SongServerActionCreators');
var PlaylistServerActionCreators = require('./actions/PlaylistServerActionCreators');

SongServerActionCreators.receiveAllSongs([
  {
    id: 1,
    name: 'Easy Muffin',
    duration: {
      minutes: 5,
      seconds: 2
    },
    album_order: 1,
    artist_id: 1,
    album_id: 1,
    explicit: null,
    created_at: '2015-01-26T17:26:17.631Z',
    updated_at: '2015-01-26T17:26:17.631Z'
  },
  {
    id: 2,
    name: 'Creatures',
    duration: {
      minutes: 5,
      seconds: 22
    },
    album_order: 10,
    artist_id: 1,
    album_id: 1,
    explicit: null,
    created_at: '2015-01-26T17:26:17.662Z',
    updated_at: '2015-01-26T17:26:17.662Z'
  }
]);

PlaylistServerActionCreators.receiveAllPlaylists([
  {
    id: 2,
    title: 'Test Josh',
    description: "Josh's Test Playlist",
    user_id: 1,
    created_at: null,
    updated_at: null,
    links: {songs: [1]}
  }
]);

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
