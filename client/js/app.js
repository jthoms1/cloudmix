/** @jsx React.DOM */
'use strict';

let React = require('react');
let Router = require('react-router');
let Route = require('react-router').Route;
let DefaultRoute = require('react-router').DefaultRoute;
let Link = require('react-router').Link;
let RouteHandler = require('react-router').RouteHandler;

let Main = require('./components/playlist/Main');
let Playlist = require('./components/playlist/PlaylistSection');
let Catalog = require('./components/playlist/CatalogSection');

require('./actions/PlaylistServerActionCreators').receiveAll(window.__DATA__.playlists);
require('./actions/SongServerActionCreators').receiveAll(window.__DATA__.songs);

let App = React.createClass({
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

let routes = (
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
