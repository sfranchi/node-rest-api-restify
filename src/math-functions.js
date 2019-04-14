"use strict";

const helpers = require("../helpers/helpers");

var _add = (a, b) => {
  if (!helpers.isNumeric(a) || !helpers.isNumeric(b)) {
    throw new Error("Invalid parameters received");
  }

  return a + b;
}
var _substract = (a, b) => {
  if (!helpers.isNumeric(a) || !helpers.isNumeric(b)) {
    throw new Error("Invalid parameters received");
  }

  return a - b;
}
var _multiply = (a, b) => {
  if (!helpers.isNumeric(a) || !helpers.isNumeric(b)) {
    throw new Error("Invalid parameters received");
  }

  return a * b;
}
var _divide = (a, b) => {
  if (!helpers.isNumeric(a) || !helpers.isNumeric(b)) {
    throw new Error("Invalid parameters received");
  }

  return a / b;
}

module.exports = {
  add: _add,
  substract: _substract,
  multiply: _multiply,
  divide: _divide
}
