"use strict";

const restify = require("restify");
const Router = require("restify-router").Router;
const router = new Router();
var sample_methods = require("../src/sample-methods");

router.get("/case/:text", restify.plugins.conditionalHandler(
  [{
    version: ["1.0.0", "1.8.9", "1.9.9"],
    handler: sample_methods.lowerCase
  },
  {
    version: "2.0.0",
    handler: sample_methods.upperCase
  },
  ]
));

router.get("/math/:a/:b", restify.plugins.conditionalHandler(
  [{
    version: ["1.0.0", "1.5.0"], // Esta versión suma dos valores
    handler: sample_methods.math_v100
  },
  {
    version: ["1.5.1", "1.8.9"], // Esta versión resta dos valores
    handler: sample_methods.math_v151
  },
  {
    version: "1.9.0", // Esta versión multiplica dos valores
    handler: sample_methods.math_v190
  },
  {
    version: "2.0.0", // Esta versión divide dos valores
    handler: sample_methods.math_v200
  },
  ]
));

module.exports = router;
