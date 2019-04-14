"use strict";

const functions = require("../src/string-functions");
const chai = require("chai");
const expect = chai.expect;

const strLower = "abcdef";
const strUpper = "ABCDEF";

describe("Funciones string", () => {
  it("Uppercase", () => {
    expect(functions.upperCase(strLower)).to.eql(strUpper);
  });
  it("Lowercase", () => {
    expect(functions.lowerCase(strLower)).to.eql(strLower);
  });
});
