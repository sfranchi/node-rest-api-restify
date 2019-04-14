"use strict";

require("dotenv").config();
const constants = require("./constants");

const _trackEvent = (payload) => {
  if (_getEnvironment() === constants.ENVIRONMENT_PROD) {
    //console.log(payload);
  } else {
    console.log(payload);
  }
};
const _getEnvironment = () => process.env.NODE_ENV;
const _isNumeric = (number) => (!isNaN(parseFloat(number)) && isFinite(number));

module.exports = {
  trackEvent: _trackEvent,
  getEnvironment: _getEnvironment,
  isNumeric: _isNumeric
};
