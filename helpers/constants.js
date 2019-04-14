"use strict";

exports.ENV = {
  // Posibles valores para la variable de entorno NODE_ENV
  ENVIRONMENT_PROD: "prod",
  ENVIRONMENT_DEBUG: "debug",
  ENVIRONMENT_QA: "qa",
  ENVIRONMENT_TEST: "test",
  ENVIRONMENT_DEFAULT: "debug"
};

exports.HTTP_STATUS = {
  // HTTP Response codes (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ALLOWED: 405,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

exports.TYPES = {
  NUMBER: "number",
  STRING: "string",
  BOOLEAN: "boolean",
  OBJECT: "object",
  UNDEFINED: "undefined",
  FUNCTION: "function",
  NULL: "null",
  SYMBOL: "symbol"
};

exports.CONTENT_TYPES = {
  CONTENT_TYPE: "Content-type",
  TEXT_HTML: "text/html",
  TEXT_XML: "text/xml ",
  APPLICATION_JSON: "application/json"
};

exports.HEADERS = {
  ACCEPT_VERSION: "accept-version",
  AUTHORIZATION: "Authorization",
  LOCATION: "Location"
};

exports.TOKENS = {
  AUTHORIZATION_TOKEN: "6572d17b-794b-4b80-993a-35fc90389900"
};

exports.DB_ERRORS = {
  NO_ERROR: 0,
  CONNECTION_ERROR: 1,
  EXECUTION_ERROR: 2,
  UNKNOWN_ERROR: 3,
  PARAMETERS_VALIDATION_ERROR: 4
}
