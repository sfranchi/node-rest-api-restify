"use strict"

const randExp = require("randexp").randexp;

const _fakeZipCode = () => randExp(/^[0-9,A-Z]{8}$/);
const _fakeCityName = () => randExp(/Ciudad ^[0-9,A-Z]{8}$/);

module.exports = {
  fakeZipCode: _fakeZipCode,
  fakeCityName: _fakeCityName
}
