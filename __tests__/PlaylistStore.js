// tests/sum-test.js
'use strict';

jest.dontMock('../client/js/stores/PlaylistStore');

describe('Test Store Setup', function() {
  it('should be empty when first created', function() {
    var store = require('../client/js/stores/PlaylistStore');
    expect(store.getAll().length).toBe(0);
  });
});
