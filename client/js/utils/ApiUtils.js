'use strict';

let request = require('superagent');

request.then = function(fulfilled, rejected) {
  return new Promise(function(resolve, reject) {
    this.end(function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }.bind(this)).then(fulfilled, rejected);
};

function _getResourceUrl(resourceName, id=null) {
  let url = '/api/' + resourceName;
  url += (id) ? '/' + id : '';
  return url;
}

module.exports = {
  get (resourceName, options={}) {
    let resourceUrl = _getResourceUrl(resourceName);
    request
      .get(resourceUrl)
      .accept('application/json')
      .query(options)
      .then(function(res) {
        return res;
      });
  },

  create (resourceName, resource, options={}) {
    let resourceUrl = _getResourceUrl(resourceName, resource.id);
    request.post(resourceUrl)
      .set('Content-Type', 'application/json')
      .query(options)
      .send(resource)
      .then(function(res) {
        return res;
      });
  },

  update (resourceName, resource, options={}) {
    let resourceUrl = _getResourceUrl(resourceName, resource.id);
    request.put(resourceUrl)
      .set('Content-Type', 'application/json')
      .query(options)
      .send(resource)
      .then(function(res) {
        return res;
      });
  },

  del (resourceName, resource) {
    let resourceUrl = _getResourceUrl(resourceName, resource.id);
    request.del(resourceUrl)
      .then(function(res) {
        return res;
      });
  }
};
