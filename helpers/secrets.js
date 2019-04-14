"option strict";

require("dotenv").config();
const _ = require("lodash");

exports.sqlServerConfig = async () => {
  var secret = {
    server: process.env.SQL_SERVER_HOST,
    port: _.toInteger(process.env.SQL_SERVER_PORT),
    user: process.env.SQL_SERVER_USER,
    password: process.env.SQL_SERVER_PASSWORD,
    database: process.env.SQL_SERVER_DATABASE,
    options: {
      encrypt: (process.env.SQL_SERVER_ENCRYPT === true)
    }
  };

  return secret;
}

exports.mongoDBConfig = async () => {
  var secret = `mongodb://${encodeURI(process.env.MONGODB_USER)}:${encodeURI(process.env.MONGODB_PASSWORD)}@${encodeURI(process.env.MONGODB_HOST)}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;

  return secret;
}

exports.mongoDBDatabaseName = async () => {
  var database = process.env.MONGODB_DATABASE;

  return database;
}
