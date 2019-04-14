"use strict";

const chai = require("chai");
const expect = chai.expect;
const helpers = require("../helpers/helpers");
const ENV = require("../helpers/constants").ENV;

describe("Test suite de getEnvironment", () => {
  it("Verificar test environment", () => {
    // Los scripts de test en package.json definen la variable de entorno NODE_ENV="test"
    expect(helpers.getEnvironment()).to.eql(ENV.ENVIRONMENT_TEST);
  });
});

describe("Test suite de isNumeric", () => {
  it("Escenarios de retorno true", () => {
    expect(helpers.isNumeric(12)).to.be.true;
    expect(helpers.isNumeric(0)).to.be.true;
    expect(helpers.isNumeric(-1)).to.be.true;
    expect(helpers.isNumeric(12.23)).to.be.true;
    expect(helpers.isNumeric(-12.23)).to.be.true;
  });

  it("Escenarios de retorno false", () => {
    // Otros
    expect(helpers.isNumeric(null)).to.be.false;
    expect(helpers.isNumeric([1, 2])).to.be.false;
    expect(helpers.isNumeric({
      a: 1,
      b: 2
    })).to.be.false;

    // Texto
    expect(helpers.isNumeric("")).to.be.false;
    expect(helpers.isNumeric("aa")).to.be.false;
  });
});
