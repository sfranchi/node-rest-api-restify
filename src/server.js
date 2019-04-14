"use strict";

require("dotenv").config();
const moment = require("moment");
const API_MIN_VERSION = "1.0.0";
const API_CURRENT_VERSION = "2.0.0";
const helpers = require("../helpers/helpers");
const HEADERS = require("../helpers/constants").HEADERS;
const TOKENS = require("../helpers/constants").TOKENS;
const ENV = require("../helpers/constants").ENV;
const sqlserver_router = require("../routers/sqlserver-routes");
const mongo_router = require("../routers/mongodb-routes");
const sample_methods_router = require("../routers/sample-methods-routes");

// Restify server setup
const restify = require("restify");
const restify_errors = require("restify-errors");
const server = restify.createServer({
  name: `Sample RESTful API Server v:${API_CURRENT_VERSION}`,
  versions: [API_MIN_VERSION, API_CURRENT_VERSION],
  version: API_CURRENT_VERSION,
  rejectUnauthorized: true,
  ignoreTrailingSlash: true
});

// Server behaviour configuration
server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.gzipResponse());
server.use(
  restify.plugins.throttle({
    burst: 100,
    rate: 50,
    ip: true
  })
);

// Configure server routing and global prefixes for each router
sqlserver_router.applyRoutes(server, "/sqlserver");
mongo_router.applyRoutes(server, "/mongodb");
sample_methods_router.applyRoutes(server, "/samples");

// Authorization middleware
server.use(function authenticate(req, res, next) {
  // Validate as appropriate...
  if (req.header(HEADERS.AUTHORIZATION) === TOKENS.AUTHORIZATION_TOKEN) {
    return next();
  } else {
    var err = new restify_errors.UnauthorizedError("Acceso no autorizado");
    helpers.trackEvent({
      name: "Acceso no autorizado",
      properties: {
        path: req.getPath(),
        ip: req.connection.remoteAddress,
        requestedVersion: req.headers[HEADERS.ACCEPT_VERSION]
      }
    });

    res.send(err);
  }
});

// Process some server generated events
server.on("VersionNotAllowed", function (req, res, callback) {
  helpers.trackEvent({
    name: "Versión inválida de API solicitada",
    event: "VersionNotAllowed",
    properties: {
      requestedVersion: req.headers[HEADERS.ACCEPT_VERSION]
    }
  });

  var err = new restify_errors.InvalidVersionError(`Versión no soportada: (${req.headers[HEADERS.ACCEPT_VERSION]}) en ruta '${req.url}'`);

  res.send(err);
});

server.on("InvalidContent", function (req, res, err, callback) {
  helpers.trackEvent({
    properties: {
      name: "Contenido inválido",
      event: "InvalidContent",
      description: `Contenido inválido '${err.toString}') en ruta '${req.url}'`,
      error: err,
      requestedVersion: req.headers[HEADERS.ACCEPT_VERSION]
    }
  });
  var exception = new restify_errors.InvalidContentError(
    `Contenido inválido ('${req.body}') en ruta '${req.url}'`
  );
  res.send(exception);
});

server.on("uncaughtException", function (req, res, err, callback) {
  helpers.trackEvent({
    properties: {
      name: "Excepción no capturada",
      event: "uncaughtException",
      description: `Error inesperado ('${err.toString}') en ruta '${req.url}'`,
      error: err,
      requestedVersion: req.headers[HEADERS.ACCEPT_VERSION]
    }
  });
  var exception = new restify_errors.InternalServerError(
    `Error inesperado ('${err.toString}') en ruta '${req.url}'`
  );
  res.send(exception);
});

if (process.env.NODE_ENV !== ENV.ENVIRONMENT_TEST) {
  server.listen(process.env.API_PORT || 3000, () => {
    helpers.trackEvent({
      name: "Inicialización del server",
      event: "serverStart",
      description: `'${server.name}' escuchando en ${server.url} - Ejecutándose en entorno '${helpers.getEnvironment()}'`,
      version: server.version,
      server: server,
      date: moment.utc().format()
    });
  });
}

module.exports = server;
