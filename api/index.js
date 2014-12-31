'use strict';

var express = require('express');
var us = require('underscore.string');
/*eslint-disable new-cap */
var router = express.Router();
/*eslint-enable new-cap */

/*
  /api/user/1?with=organization.owner,organization.staff

  /api/user?firstName=like:Joh*
  /api/user?role=eq:editor
  /api/user?role=eq:editor&createdBy=eq:4
  /api/user?role=in:editor,author
  /api/user?createdAt=gt:10
  /api/user?createdAt=lt:10

  /api/user?organization.type=eq:facility
  /api/user?organization.type=eq:facility

  /api/user?limit=10
  /api/user?limit=20,10

  /api/user?orderBy=lastName
  /api/user?orderBy=-lastName
  /api/user?orderBy=-lastName,firstName

*/

function withRelated(parameters) {
  if (!parameters.hasOwnProperty('with')) {
    return null;
  }

  return {
    withRelated: parameters.with.split(',')
  };
}

function parseOrderBy(parameters) {
  var direction, column;

  if (!parameters.hasOwnProperty('orderBy')) {
    return null;
  }

  if (parameters.orderBy.charAt(0) === '-') {
    direction = 'desc';
    column = parameters.orderBy.substr(1);
  } else {
    direction = 'asc';
    column = parameters.orderBy;
  }

  return {
    column: column,
    direction: direction
  };
}

function parseLimit(parameters) {
  var limit = 10;

  if (parameters.limit) {
    limit = parseInt(parameters.limit, 10);
  }

  return {
    limit: limit
  };
}

function buildQuery(parameters) {
  return function (qb) {

    var orderByObj = parseOrderBy(parameters);
    if (orderByObj) {
      qb.orderBy(orderByObj.column, orderByObj.direction);
    }

    var limitObj = parseLimit(parameters);
    qb.limit(limitObj.limit);
  };
}

function getListOfItems(req, res, next, Model) {
  Model
    .query(buildQuery(req.query))
    .fetchAll(withRelated(req.query))
    .then(function(items) {
      req.apiData = items;
      next();
    })
    .catch(function(err) {
      res.send(err);
    });
}

function createItem(req, res) {
  res.send('not impleted');
}

function getItem(req, res, next, Model) {
  var instance = new Model();
  var parameters = {};
  parameters[instance.idAttribute] = req.params.itemId;

  new Model(parameters)
    .fetch(withRelated(req.query))
    .then(function(items) {
      req.apiData = items;
      next();
    })
    .catch(function(err) {
      res.send(err);
    });
}

function updateItem(req, res) {
  res.send('not impleted');
}

function patchItem(req, res) {
  res.send('not impleted');
}

function deleteItem(req, res) {
  res.send('not impleted');
}


module.exports = function(models) {

  function getModelNameByResourceName (resourceName) {
    return us.capitalize(us.camelize(resourceName));
  }

  function getModelByResourceName (resourceName) {
    var modelName = getModelNameByResourceName(resourceName);

    if (models.hasOwnProperty(modelName)) {
      return models[modelName];
    }
  }

  router.route('/:resource')
    .get(function(req, res, next) {
      var Model = getModelByResourceName(req.params.resource);
      if (!Model) { return res.status(404).send('Not found'); }

      getListOfItems(req, res, next, Model);
    })

    .post(function (req, res, next) {
      var Model = getModelByResourceName(req.params.resource);
      if (!Model) { return res.status(404).send('Not found'); }

      createItem(req, res, next, Model);
    });

  router.route('/:resource/:itemId')
    .get(function (req, res, next) {
      var Model = getModelByResourceName(req.params.resource);
      if (!Model) { return res.status(404).send('Not found'); }

      getItem(req, res, next, Model);
    })

    .put(function (req, res, next) {
      var Model = getModelByResourceName(req.params.resource);
      if (!Model) { return res.status(404).send('Not found'); }

      updateItem(req, res, next, Model);
    })

    .patch(function (req, res, next) {
      var Model = getModelByResourceName(req.params.resource);
      if (!Model) { return res.status(404).send('Not found'); }

      patchItem(req, res, next, Model);
    })

    .delete(function (req, res, next) {
      var Model = getModelByResourceName(req.params.resource);
      if (!Model) { return res.status(404).send('Not found'); }

      deleteItem(req, res, next, Model);
    });

  var responder = function (req, res) {
    res.json(req.apiData.toJSON());
  };

  return {
    router: router,
    responder: responder
  };
};

