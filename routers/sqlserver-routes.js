"use strict";

const Router = require("restify-router").Router;
const router = new Router();
var crud = require("../src/sql-server-methods");

router.post("/city", crud.create);
router.get("/city", crud.retrieve);
router.get("/city/:ZipCode", crud.retrieve);
router.put("/city/:ZipCode", crud.update);
router.del("/city/:ZipCode", crud.delete);

module.exports = router;
