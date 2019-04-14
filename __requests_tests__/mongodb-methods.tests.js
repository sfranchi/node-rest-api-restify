"use strict";

const server = require("../src/server").server;
const HTTP_STATUS = require("../helpers/constants").HTTP_STATUS;
const HEADERS = require("../helpers/constants").HEADERS;
const TOKENS = require("../helpers/constants").TOKENS;
const CONTENT_TYPES = require("../helpers/constants").CONTENT_TYPES;
const testsHelper = require("../helpers/tests");

const chai = require("chai");
const chai_http = require("chai-http");
const chai_arrays = require("chai-arrays");

chai.use(chai_http);
chai.use(chai_arrays);

const expect = chai.expect;
var requester = chai.request(server).keepOpen();

var fakeZipCode;
var fakeCityName;
var fakeCityName2;
var newCity;
var updatedCity;

beforeAll(() => {
  fakeZipCode = testsHelper.fakeZipCode();
  fakeCityName = testsHelper.fakeCityName();
  fakeCityName2 = testsHelper.fakeCityName();

  newCity = {
    ZipCode: fakeZipCode,
    CityName: fakeCityName
  };

  updatedCity = {
    ZipCode: fakeZipCode,
    CityName: fakeCityName2
  };
});

afterAll(() => {
  requester.close();
});

describe("Test de métodos MongoDB", () => {
  describe("POST", () => {
    it("Creación fallida - Sin body", () => requester
      .post("/mongodb/city/")
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Creación fallida - Body vacío", () => requester
      .post("/mongodb/city/")
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .send({})
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Creación fallida - CityName ausente", () => requester
      .post("/mongodb/city/")
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .send({
        ZipCode: fakeZipCode
      })
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Creación fallida - ZipCode ausente", () => requester
      .post("/mongodb/city/")
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .send({
        CityName: fakeCityName
      })
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Creación exitosa", () => requester
      .post("/mongodb/city")
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .set(CONTENT_TYPES.CONTENT_TYPE, CONTENT_TYPES.APPLICATION_JSON)
      .send(newCity)
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.CREATED);
        expect(response).to.be.json;
        // Now the object has the Id from the database
        newCity = response.body;
      })
      .catch((error) => {
        throw error;
      })
    );
  });

  describe("GET", () => {
    it("Obtención fallida - ZipCode inexistente", () => requester
      .get("/mongodb/city/nonExistentZIP")
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.NOT_FOUND);
        expect(response).to.be.json;
        expect(response.body).to.be.array;
        expect(response.body).to.be.ofSize(0);
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Obtención de una ciudad", () => requester
      .get(`/mongodb/city/${fakeZipCode}`)
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.OK);
        expect(response).to.be.json;
        expect(response.body).to.be.array;
        expect(response.body).to.be.ofSize(1);
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Obtención de lista de ciudades", () => requester
      .get("/mongodb/city/")
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.OK);
        expect(response).to.be.json;
        expect(response).to.be.array;
      })
      .catch((error) => {
        throw error;
      })
    );
  });

  describe("PUT", () => {
    it("Update fallido - ZipCode ausente", () => requester
      .put("/mongodb/city/")
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.NOT_ALLOWED);
        expect(response).to.be.json;
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Update fallido - Sin body", () => requester
      .put(`/mongodb/city/${fakeZipCode}`)
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Update fallido - Body vacío", () => requester
      .put(`/mongodb/city/${fakeZipCode}`)
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .send({})
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Update fallido - CityName ausente", () => requester
      .put(`/mongodb/city/${fakeZipCode}`)
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .send({
        ZipCode: fakeZipCode
      })
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Update exitoso", () => requester
      .put(`/mongodb/city/${fakeZipCode}`)
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .set(CONTENT_TYPES.CONTENT_TYPE, CONTENT_TYPES.APPLICATION_JSON)
      .send({
        CityName: fakeCityName2
      })
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.OK);
        expect(response).to.be.json;
        updatedCity = response.body;
        expect(updatedCity.ZipCode).to.eql(fakeZipCode);
        expect(updatedCity.CityName).to.eql(fakeCityName);
      })
      .catch((error) => {
        throw error;
      })
    );
  });

  describe("DEL", () => {
    it("Eliminación fallida - Zip Code ausente", () => requester
      .del("/mongodb/city/")
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.NOT_ALLOWED);
        expect(response).to.be.json;
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Eliminación fallida - Zip Code no existente", () => requester
      .del("/mongodb/city/nonExistentZIP")
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.NOT_FOUND);
        expect(response).to.be.json;
      })
      .catch((error) => {
        throw error;
      })
    );

    it("Eliminación Exitosa", () => requester
      .del(`/mongodb/city/${fakeZipCode}`)
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.OK);
        expect(response).to.be.json;
        var deletedCity = response.body;
        expect(deletedCity.ZipCode).to.eql(fakeZipCode);
        expect(deletedCity.CityName).to.eql(fakeCityName2);
      })
      .catch((error) => {
        throw error;
      })
    );
  });
});
