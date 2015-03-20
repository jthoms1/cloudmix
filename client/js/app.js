'use strict';

require('babel/polyfill');
let React = require('react');
let Router = require('react-router');
let Route = require('react-router').Route;
let DefaultRoute = require('react-router').DefaultRoute;
let Link = require('react-router').Link;
let RouteHandler = require('react-router').RouteHandler;
let j2s = require('jsonapi2simple');

let Main = require('./components/Main');
let PlaylistList = require('./components/playlist/PlaylistSection');
let CreatePlaylist = require('./components/playlist/CreatePlaylist');
let ViewPlaylist = require('./components/playlist/ViewPlaylist');
let Catalog = require('./components/catalog/CatalogSection');

require('./actions/PlaylistServerActionCreators').receiveAll(j2s.toSimple(window.__DATA__.playlists));
require('./actions/SongServerActionCreators').receiveAll(j2s.toSimple(window.__DATA__.songs));

let App = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li><Link to="app">Home</Link></li>
          <li><Link to="catalog">Catalog</Link></li>
          <li><Link to="playlists">Playlists</Link></li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }
});

let Playlists = React.createClass({
  render() {
    return (
      <div>
        <h3>Playlists</h3>
        <RouteHandler/>
      </div>
    );
  }
});

let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="catalog" handler={Catalog}/>
    <Route name="playlists" handler={Playlists}>
      <DefaultRoute handler={PlaylistList}/>
      <Route name="createPlaylist" path="create" handler={CreatePlaylist}/>
      <Route name="viewPlaylist" path=":id" handler={ViewPlaylist}/>
    </Route>
    <DefaultRoute handler={Main}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(
    <Handler/>,
    document.getElementById('main')
  );
});
