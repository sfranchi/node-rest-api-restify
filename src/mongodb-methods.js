"use strict";

const mongodb_functions = require("./mongodb-functions");
const HTTP_STATUS = require("../helpers/constants").HTTP_STATUS;
const HEADERS = require("../helpers/constants").HEADERS;
const DB_ERRORS = require("../helpers/constants").DB_ERRORS;

const _ = require("lodash");
const validator = require("fluent-validator");

const _create = async (req, res, next) => {
  var validParams = false;
  validParams = validator()
    .validate(req.body).param("ZipCode").isNotEmpty()
    .validate(req.body).param("CityName").isNotEmpty()
    .check();

  if (!validParams) {
    res.writeHead(HTTP_STATUS.BAD_REQUEST);
  } else {
    try {
      var result = await mongodb_functions.create_city(req.body);

      if (result.error === DB_ERRORS.NO_ERROR) {
        res.header(HEADERS.LOCATION, `${req.url}/${req.body.ZipCode}`);
        res.json(HTTP_STATUS.CREATED, result.payload);
      } else {
        if (result.error === DB_ERRORS.PARAMETERS_VALIDATION_ERROR) {
          res.json(HTTP_STATUS.BAD_REQUEST, result);
        } else {
          res.json(HTTP_STATUS.SERVER_ERROR, result);
        }
      }
    } catch (err) {
      res.json(HTTP_STATUS.SERVER_ERROR, result);
    }
  }
  res.end();

  return next();
};

const _retrieve = async (req, res, next) => {
  try {
    var result = await mongodb_functions.retrieve_city(req.params.ZipCode);

    if (result.error === DB_ERRORS.NO_ERROR) {
      res.json((result.payload.length === 0) ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.OK, result.payload);
    } else {
      res.json(HTTP_STATUS.SERVER_ERROR, result);
    }
  } catch (err) {
    res.json(HTTP_STATUS.SERVER_ERROR, result);
  }
  res.end();

  return next();
};

const _update = async (req, res, next) => {
  var validParams = false;

  validParams = validator()
    .validate(req.params).param("ZipCode").isNotEmpty()
    .validate(req.body).param("CityName").isNotEmpty()
    .check();

  if (!validParams) {
    res.writeHead(HTTP_STATUS.BAD_REQUEST);
  } else {
    try {
      var result = await mongodb_functions.update_city(req.params.ZipCode, req.body);

      if (result.error === DB_ERRORS.NO_ERROR) {
        res.json(_.isNull(result.payload) ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.OK, result.payload);
      } else {
        if (result.error === DB_ERRORS.PARAMETERS_VALIDATION_ERROR) {
          res.json(HTTP_STATUS.BAD_REQUEST, result);
        } else {
          res.json(HTTP_STATUS.SERVER_ERROR, result);
        }
      }
    } catch (err) {
      res.json(HTTP_STATUS.SERVER_ERROR, result);
    }
  }
  res.end();

  return next();
};

const _delete = async (req, res, next) => {
  try {
    var result = await mongodb_functions.delete_city(req.params.ZipCode);

    if (result.error === DB_ERRORS.NO_ERROR) {
      res.json((_.isNull(result.payload)) ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.OK, result.payload);
    } else {
      if (result.error === DB_ERRORS.PARAMETERS_VALIDATION_ERROR) {
        res.json(HTTP_STATUS.BAD_REQUEST, result);
      } else {
        res.json(HTTP_STATUS.SERVER_ERROR, result);
      }
    }
  } catch (err) {
    res.json(HTTP_STATUS.SERVER_ERROR, result);
  }
  res.end();

  return next();
};

module.exports = {
  create: _create,
  retrieve: _retrieve,
  update: _update,
  delete: _delete
}
