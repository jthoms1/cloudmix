'use strict';

jest.dontMock('../client/js/constants/Constants');
jest.dontMock('../client/js/stores/PlaylistStore');
jest.dontMock('object-assign');

describe('PlaylistStore', function() {

  var Constants = require('../client/js/constants/Constants');
  var AppDispatcher;
  var PlaylistStore;
  var callback;

  // mock actions
  var actionPlaylistCreate = {
    actionType: Constants.TODO_CREATE,
    text: 'foo'
  };
  var actionPlaylistDestroy = {
    actionType: Constants.TODO_DESTROY,
    id: 'replace me in test'
  };

  beforeEach(function() {
    AppDispatcher = require('../client/js/dispatchers/Dispatcher');
    PlaylistStore = require('../client/js/stores/PlaylistStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with no to-do items', function() {
    var all = PlaylistStore.getAll();
    expect(all).toEqual({});
  });

  it('creates a to-do item', function() {
    callback(actionPlaylistCreate);

    var all = PlaylistStore.getAll();
    var keys = Object.keys(all);

    expect(keys.length).toBe(1);
    expect(all[keys[0]].text).toEqual('foo');
  });

  it('destroys a to-do item', function() {
    callback(actionPlaylistCreate);

    var all = PlaylistStore.getAll();
    var keys = Object.keys(all);

    expect(keys.length).toBe(1);
    actionPlaylistDestroy.id = keys[0];
    callback(actionPlaylistDestroy);
    expect(all[keys[0]]).toBeUndefined();
  });

  it('can determine whether all to-do items are complete', function() {
    var i = 0;
    for (; i < 3; i++) {
      callback(actionPlaylistCreate);
    }
    expect(Object.keys(PlaylistStore.getAll()).length).toBe(3);
    expect(PlaylistStore.areAllComplete()).toBe(false);

    var all = PlaylistStore.getAll();
    for (var key in all) {
      callback({
        actionType: Constants.TODO_COMPLETE,
        id: key
      });
    }
    expect(PlaylistStore.areAllComplete()).toBe(true);

    callback({
      actionType: Constants.TODO_UNDO_COMPLETE,
      id: key
    });
    expect(PlaylistStore.areAllComplete()).toBe(false);
  });

});
