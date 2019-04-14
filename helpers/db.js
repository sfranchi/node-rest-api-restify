"use strict";

require("dotenv").config();
const sqlServer = require("mssql");
const mongoDB = require("mongodb").MongoClient;
const _ = require("lodash");
const helpers = require("../helpers/helpers");
const secrets = require("../helpers/secrets");

var sqlServerConnectionPool = {
  pool: null
}

const _getSQLServerConnectionPool = async () => {
  try {
    var sqlServerConfig = await secrets.sqlServerConfig();
    var pool = new sqlServer.ConnectionPool(sqlServerConfig);

    return pool.connect();
  } catch (err) {
    sqlServerConnectionPool.pool = null;

    helpers.trackEvent({
      name: "_getSQLServerConnectionPool",
      properties: {
        text: err.message,
        result: {
          code: err.code,
          originalError: err.originalError,
          stack: err.stack
        }
      }
    });

    throw new Error(err);
  }
}

const _getSQLServerPool = async () => {
  if (!_.isNull(sqlServerConnectionPool.pool)) {
    return sqlServerConnectionPool.pool;
  } else {
    try {
      sqlServerConnectionPool.pool = await _getSQLServerConnectionPool();
      return sqlServerConnectionPool.pool;
    } catch (err) {
      sqlServer.close();
      sqlServerConnectionPool.pool = null;

      helpers.trackEvent({
        name: "_getSQLServerPool",
        properties: {
          text: err.message,
          result: {
            code: err.code,
            originalError: err.originalError,
            stack: err.stack
          }
        }
      });

      throw new Error(err);
    }
  }
}


var mongoDBConnectionPool = {
  pool: null
}

const _getMongoDBConnectionPool = async () => {
  try {
    var mongoDBConfig = await secrets.mongoDBConfig();
    var mongoDBDatabaseName = await secrets.mongoDBDatabaseName();

    var pool = await mongoDB.connect(mongoDBConfig, {
      useNewUrlParser: true
    });

    return await pool.db(mongoDBDatabaseName);
  } catch (err) {
    mongoDBConnectionPool.pool = null;
    helpers.trackEvent({
      name: "_getMongoDBConnectionPool",
      properties: {
        text: err.message,
        result: {
          code: err.code,
          originalError: err.originalError,
          stack: err.stack
        }
      }
    });

    throw new Error(err);
  }
}

const _getMongoDBPool = async () => {
  if (!_.isNull(mongoDBConnectionPool.pool)) {
    return mongoDBConnectionPool.pool;
  } else {
    try {
      mongoDBConnectionPool.pool = await _getMongoDBConnectionPool();
      return mongoDBConnectionPool.pool;
    } catch (err) {
      mongoDB.close();
      mongoDBConnectionPool.pool = null;

      helpers.trackEvent({
        name: "_getMongoDBPool",
        properties: {
          text: err.message,
          result: {
            code: err.code,
            originalError: err.originalError,
            stack: err.stack
          }
        }
      });

      throw new Error(err);
    }
  }
}

exports.SQLServer = {
  getConnection: _getSQLServerPool
}

exports.MongoDB = {
  getConnection: _getMongoDBPool
}
