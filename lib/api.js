/*eslint-disable new-cap, no-unused-vars */
'use strict';

var express = require('express');
var router = express.Router();

/*
  /api/user/1?include=organization.owner,organization.staff

  /api/user/1/links/organization

  /api/user?firstName=like:Joh*
  /api/user?role=editor&createdBy=4
  /api/user?role=eq:editor
  /api/user?role=eq:editor&createdBy=eq:4
  /api/user?role=in:editor,author
  /api/user?createdAt=gt:10
  /api/user?createdAt=lt:10

  /api/user?organization.type=eq:facility
  /api/user?organization.type=eq:facility

  /api/user?limit=10
  /api/user?limit=20,10

  /api/user?sort=lastName
  /api/user?sort=-lastName
  /api/user?sort=-lastName,firstName

*/

function withRelated(parameters) {
  return {
    withRelated: parameters.with.split(',')
  };
}

function parseOrderBy(parameters) {
  var direction, column;

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

function getListOfItems(params, Model) {
  return Model
//    .query(buildQuery(req.query))
//    .fetchAll(withRelated(req.query))
    .fetchAll();
}

function getItem(params, Model) {
  var instance = new Model();
  var attrs = {};
  attrs[instance.idAttribute] = params.itemId;

  return new Model(attrs)
    .fetch();
//    .fetch(withRelated(req.query))
}

module.exports = function (models, options) {

  function getModelByResourceName (modelName) {
    if (models.hasOwnProperty(modelName)) {
      return models[modelName];
    }
  }

  var optionDefaults = {
    paramTransform: function (req) {
      return req.params;
    },
    responseTransform: function (req, res) {
      res.json(req.apiData.toJSON());
    }
  };

  options = options || optionDefaults;
  var paramTransform = options.paramTransform || optionDefaults.paramTransform;
  var responseTransform = options.responseTransform || optionDefaults.responseTransform;

  router.param('resource', function (req, res, next, resource) {
    var Model = getModelByResourceName(resource);
    if (!Model) {
      return res.status(404).send('Not found');
    } else {
      req.Model = Model;
      next();
    }
  });

  router.use('/:resource', function (req, res, next) {
    var params = paramTransform(req);

    getListOfItems(params, req.Model)
      .then(function(items) {
        req.apiData = items;
        next();
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  router.use('/:resource/:itemId', function (req, res, next) {
    var params = paramTransform(req);

    getItem(params, req.Model)
      .then(function(items) {
        req.apiData = items;
        next();
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  router.use(responseTransform);

  return router;
};

