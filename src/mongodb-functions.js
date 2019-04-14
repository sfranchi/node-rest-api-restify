"use strict";

require("dotenv").config();
const _ = require("lodash");
const mongoDB = require("../helpers/db").MongoDB;
const ENV = require("../helpers/constants").ENV;
const DB_ERRORS = require("../helpers/constants").DB_ERRORS;

const _create_city = async (body) => {
  var pool;
  var result;

  try {
    pool = await mongoDB.getConnection();
  } catch (err) {
    result = {
      error: DB_ERRORS.CONNECTION_ERROR,
      message: err.message
    };
    if (process.env.NODE_ENV != ENV.ENVIRONMENT_PROD) {
      result.code = err.code;
      result.originalError = err.originalError;
      result.stack = err.stack;
    }

    return result;
  }

  try {
    if (_.isEmpty(body) || _.isUndefined(body.ZipCode) || _.isUndefined(body.CityName)) {
      result = {
        error: DB_ERRORS.PARAMETERS_VALIDATION_ERROR,
        payload: null
      };
    } else {
      var document = {
        ZipCode: body.ZipCode,
        CityName: body.CityName
      };

      const request = await pool.collection("cities").insertOne(document);
      result = {
        error: DB_ERRORS.NO_ERROR,
        payload: request.ops[0]
      };
    }
    return result;
  } catch (err) {

    result = {
      error: DB_ERRORS.EXECUTION_ERROR,
      message: err.message
    };
    if (process.env.NODE_ENV != ENV.ENVIRONMENT_PROD) {
      result.code = err.code;
      result.originalError = err.originalError;
      result.stack = err.stack;
    }

    return result;
  }
}

const _retrieve_city = async (zipcode) => {
  var pool;
  var result;

  try {
    pool = await mongoDB.getConnection();
  } catch (err) {
    result = {
      error: DB_ERRORS.CONNECTION_ERROR,
      message: err.message
    };
    if (process.env.NODE_ENV != ENV.ENVIRONMENT_PROD) {
      result.code = err.code;
      result.originalError = err.originalError;
      result.stack = err.stack;
    }

    return result;
  }

  try {
    var filter = {};
    if (!_.isEmpty(zipcode)) {
      filter = {
        ZipCode: zipcode
      };
    }

    const request = await pool.collection("cities").find(filter).toArray();
    result = {
      error: DB_ERRORS.NO_ERROR,
      payload: request
    };

    return result;

  } catch (err) {
    result = {
      error: DB_ERRORS.EXECUTION_ERROR,
      message: err.message
    };
    if (process.env.NODE_ENV != ENV.ENVIRONMENT_PROD) {
      result.code = err.code;
      result.originalError = err.originalError;
      result.stack = err.stack;
    }

    return result;
  }
}

const _update_city = async (zipcode, body) => {
  var pool;
  var result;

  try {
    pool = await mongoDB.getConnection();
  } catch (err) {
    result = {
      error: DB_ERRORS.CONNECTION_ERROR,
      message: err.message
    };
    if (process.env.NODE_ENV != ENV.ENVIRONMENT_PROD) {
      result.code = err.code;
      result.originalError = err.originalError;
      result.stack = err.stack;
    }

    return result;
  }

  try {
    if (_.isEmpty(zipcode) || _.isEmpty(body) || _.isUndefined(body.CityName)) {
      result = {
        error: DB_ERRORS.PARAMETERS_VALIDATION_ERROR,
        payload: null
      };
    } else {
      var filter = {
        ZipCode: zipcode
      };
      var document = {
        $set: {
          CityName: body.CityName
        }
      };

      const request = await pool.collection("cities").findOneAndUpdate(filter, document);
      result = {
        error: DB_ERRORS.NO_ERROR,
        payload: request.value
      };
    }
    return result;

  } catch (err) {

    result = {
      error: DB_ERRORS.EXECUTION_ERROR,
      message: err.message
    };
    if (process.env.NODE_ENV != ENV.ENVIRONMENT_PROD) {
      result.code = err.code;
      result.originalError = err.originalError;
      result.stack = err.stack;
    }

    return result;
  }
}

const _delete_city = async (zipcode) => {
  var pool;
  var result;

  try {
    pool = await mongoDB.getConnection();
  } catch (err) {
    result = {
      error: DB_ERRORS.CONNECTION_ERROR,
      message: err.message
    };
    if (process.env.NODE_ENV != ENV.ENVIRONMENT_PROD) {
      result.code = err.code;
      result.originalError = err.originalError;
      result.stack = err.stack;
    }

    return result;
  }

  try {
    var filter = {
      ZipCode: zipcode
    };

    const request = await pool.collection("cities").findOneAndDelete(filter);
    result = {
      error: DB_ERRORS.NO_ERROR,
      payload: request.value
    };

    return result;

  } catch (err) {
    result = {
      error: DB_ERRORS.EXECUTION_ERROR,
      message: err.message
    };
    if (process.env.NODE_ENV != ENV.ENVIRONMENT_PROD) {
      result.code = err.code;
      result.originalError = err.originalError;
      result.stack = err.stack;
    }

    return result;
  }
}

module.exports = {
  create_city: _create_city,
  retrieve_city: _retrieve_city,
  update_city: _update_city,
  delete_city: _delete_city
}
