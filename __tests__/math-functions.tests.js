"use strict";

const functions = require("../src/math-functions");
const chai = require("chai");

chai.should();

describe("Tests exitoso de funciones matemáticas", () => {
  it.each([[2, 2, 4], [2, -2, 0], [-2, 2, 0], [-2, -2, -4]])(
    "Adición de valores %i+%i=%i",
    (a, b, expected) => {
      functions.add(a, b).should.equal(expected);
    });

  it.each([[2, 2, 0], [2, -2, 4], [-2, 2, -4], [-2, -2, 0]])(
    "Sustracción de valores %i-%i=%i",
    (a, b, expected) => {
      functions.substract(a, b).should.equal(expected);
    });

  it.each([[2, 2, 4], [2, -2, -4], [-2, 2, -4], [-2, -2, 4]])(
    "Producto de valores %i*%i=%i",
    (a, b, expected) => {
      functions.multiply(a, b).should.equal(expected);
    });

  it.each([[2, 2, 1], [2, -2, -1], [-2, 2, -1], [-2, -2, 1]])(
    "División de valores %i/%i=%i",
    (a, b, expected) => {
      functions.divide(a, b).should.equal(expected);
    });
});

describe("Tests fallido de funciones matemáticas", () => {
  it.each([["a", 2], [2, "a"], ["a", "b"]])(
    "Adición de valores inválidos %i+%i",
    (a, b) => {
      expect(() => {
        functions.add(a, b);
      }).toThrow();
    });

  it.each([["a", 2], [2, "a"], ["a", "b"]])(
    "Sustracción de valores inválidos %i-%i",
    (a, b) => {
      expect(() => {
        functions.substract(a, b);
      }).toThrow();
    });

  it.each([["a", 2], [2, "a"], ["a", "b"]])(
    "Producto de valores inválidos %i*%i",
    (a, b) => {
      expect(() => {
        functions.multiply(a, b);
      }).toThrow();
    });

  it.each([["a", 2], [2, "a"], ["a", "b"]])(
    "División de valores inválidos %i/%i",
    (a, b) => {
      expect(() => {
        functions.divide(a, b);
      }).toThrow();
    });
});
