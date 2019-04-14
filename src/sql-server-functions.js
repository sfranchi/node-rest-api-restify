"use strict";

require("dotenv").config();
const _ = require("lodash");
const sqlServer = require("../helpers/db").SQLServer;
const ENV = require("../helpers/constants").ENV;
const DB_ERRORS = require("../helpers/constants").DB_ERRORS;

const _create_city = async (body) => {
  var pool;
  var result;

  try {
    pool = await sqlServer.getConnection();
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
      var sqlCmd = `insert into cities (ZipCode, CityName) output inserted.* values ('${body.ZipCode}','${body.CityName}')`;
      const request = await pool.request()
        .query(sqlCmd);
      result = {
        error: DB_ERRORS.NO_ERROR,
        payload: request.recordset
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
    pool = await sqlServer.getConnection();
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
    var whereCondition = "";
    if (!_.isEmpty(zipcode)) {
      whereCondition = ` where ZipCode = '${zipcode}'`;
    }
    const request = await pool.request()
      .query(`select * from cities ${whereCondition}`);
    result = {
      error: DB_ERRORS.NO_ERROR,
      payload: request.recordset
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
    pool = await sqlServer.getConnection();
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
      var sqlCmd = `update cities set CityName = '${body.CityName}' output inserted.* where ZipCode = '${zipcode}'`;
      const request = await pool.request()
        .query(sqlCmd);
      result = {
        error: DB_ERRORS.NO_ERROR,
        payload: request.recordset
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
    pool = await sqlServer.getConnection();
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
    var sqlCmd = `delete from cities output deleted.* where ZipCode = '${zipcode}'`;
    const request = await pool.request()
      .query(sqlCmd);
    result = {
      error: DB_ERRORS.NO_ERROR,
      payload: request.recordset
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
};
