"use strict";

const math_functions = require("./math-functions");
const string_functions = require("./string-functions");

const helpers = require("../helpers/helpers");
const HTTP_STATUS = require("../helpers/constants").HTTP_STATUS;
const CONTENT_TYPES = require("../helpers/constants").CONTENT_TYPES;

exports.upperCase = function (req, res, next) {
  var result = string_functions.upperCase(req.params.text);

  res.setHeader(CONTENT_TYPES.CONTENT_TYPE, CONTENT_TYPES.APPLICATION_JSON);
  res.writeHead(HTTP_STATUS.OK);
  res.end(JSON.stringify({
    result: result,
    version: req._version
  }));

  helpers.trackEvent({
    name: "upperCase",
    properties: {
      text: req.params.text,
      result: result
    }
  });

  return next();
};

exports.lowerCase = function (req, res, next) {
  var result = string_functions.lowerCase(req.params.text);

  res.setHeader(CONTENT_TYPES.CONTENT_TYPE, CONTENT_TYPES.APPLICATION_JSON);
  res.writeHead(HTTP_STATUS.OK);
  res.end(JSON.stringify({
    result: result,
    version: req._version
  }));

  helpers.trackEvent({
    name: "lowerCase",
    properties: {
      text: req.params.text,
      result: result
    }
  });

  return next();
};

// Esta versión suma dos valores
exports.math_v100 = function (req, res, next) {
  var a = Number.parseFloat(req.params.a);
  var b = Number.parseFloat(req.params.b);

  res.setHeader(CONTENT_TYPES.CONTENT_TYPE, CONTENT_TYPES.APPLICATION_JSON);

  if (!helpers.isNumeric(a) || !helpers.isNumeric(b)) {
    res.writeHead(HTTP_STATUS.BAD_REQUEST);

    res.end();
  } else {
    var result = math_functions.add(a, b);

    res.writeHead(HTTP_STATUS.OK);
    res.end(JSON.stringify({
      result: result,
      version: req._version
    }));
  }

  helpers.trackEvent({
    name: "add",
    properties: {
      a: req.params.a,
      b: req.params.b,
      result: result
    }
  });

  return next();
};

// Esta versión resta dos valores
exports.math_v151 = function (req, res, next) {
  var a = req.params.a;
  var b = req.params.b;

  res.setHeader(CONTENT_TYPES.CONTENT_TYPE, CONTENT_TYPES.APPLICATION_JSON);

  if (!helpers.isNumeric(a) || !helpers.isNumeric(b)) {
    res.writeHead(HTTP_STATUS.BAD_REQUEST);

    res.end();
  } else {
    var result = math_functions.substract(a, b);

    res.writeHead(HTTP_STATUS.OK);
    res.end(JSON.stringify({
      result: result,
      version: req._version
    }));
  }

  helpers.trackEvent({
    name: "substract",
    properties: {
      a: req.params.a,
      b: req.params.b,
      result: result
    }
  });


  return next();
};

// Esta versión resta dos valores
exports.math_v190 = function (req, res, next) {
  var a = req.params.a;
  var b = req.params.b;

  res.setHeader(CONTENT_TYPES.CONTENT_TYPE, CONTENT_TYPES.APPLICATION_JSON);

  if (!helpers.isNumeric(a) || !helpers.isNumeric(b)) {
    res.writeHead(HTTP_STATUS.BAD_REQUEST);

    res.end();
  } else {
    var result = math_functions.multiply(a, b);

    res.end(JSON.stringify({
      result: result,
      version: req._version
    }));
    res.writeHead(HTTP_STATUS.OK);
  }


  helpers.trackEvent({
    name: "multiply",
    properties: {
      a: req.params.a,
      b: req.params.b,
      result: result
    }
  });

  return next();
};

// Esta versión divide dos valores
exports.math_v200 = function (req, res, next) {
  var a = req.params.a;
  var b = req.params.b;

  res.setHeader(CONTENT_TYPES.CONTENT_TYPE, CONTENT_TYPES.APPLICATION_JSON);

  if (!helpers.isNumeric(a) || !helpers.isNumeric(b)) {
    res.writeHead(HTTP_STATUS.BAD_REQUEST);

    res.end();
  } else {
    var result = math_functions.divide(a, b);

    res.end(JSON.stringify({
      result: result,
      version: req._version
    }));
    res.writeHead(HTTP_STATUS.OK);
  }

  helpers.trackEvent({
    name: "multiply",
    properties: {
      a: req.params.a,
      b: req.params.b,
      result: result
    }
  });

  return next();
};
