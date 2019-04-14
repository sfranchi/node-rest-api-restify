"use strict";

const functions = require("../src/mongodb-functions");
const testsHelper = require("../helpers/tests");
const DB_ERRORS = require("../helpers/constants").DB_ERRORS;

const chai = require("chai");
const chai_arrays = require("chai-arrays");

chai.use(chai_arrays);

const expect = chai.expect;

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

describe("Tests de funciones MongoDB", () => {
  describe("Create", () => {
    it("Creación fallida - Sin Body", () => functions.create_city()
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.PARAMETERS_VALIDATION_ERROR);
      })
    );

    it("Creación fallida - Body vacío", () => functions.create_city({})
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.PARAMETERS_VALIDATION_ERROR);
      })
    );

    it("Creación fallida - Body null", () => functions.create_city(null)
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.PARAMETERS_VALIDATION_ERROR);
      })
    );

    it("Creación fallida - CityName ausente", () => functions.create_city({
      ZipCode: fakeZipCode
    }).then((result) => {
      expect(result.error).to.eql(DB_ERRORS.PARAMETERS_VALIDATION_ERROR);
    }));

    it("Creación fallida - ZipCode ausente", () => functions.create_city({
      CityName: fakeCityName
    }).then((result) => {
      expect(result.error).to.eql(DB_ERRORS.PARAMETERS_VALIDATION_ERROR);
    }));

    it("Creación exitosa", () => functions.create_city(newCity)
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.NO_ERROR);
        expect(result.payload).to.be.array;
        expect(result.payload.ZipCode).to.eql(newCity.ZipCode);
        newCity = result.payload;
      })
    );
  });

  describe("Retrieve", () => {
    it("Obtención fallida - ZipCode inexistente", () => functions.retrieve_city("nonExistentZIP")
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.NO_ERROR);
        expect(result.payload).to.be.array;
        expect(result.payload).to.be.ofSize(0);
      })
    );

    it("Obtención de una ciudad", () => functions.retrieve_city(fakeZipCode)
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.NO_ERROR);
        expect(result.payload[0].ZipCode).to.eql(fakeZipCode);
      })
    );

    it("Obtención de lista de ciudades", () => functions.retrieve_city()
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.NO_ERROR);
        expect(result.payload).to.be.array;
      })
    );
  });

  describe("Update", () => {
    it("Update fallido - ZipCode ausente", () => functions.update_city(null, {
      CityName: fakeCityName2
    }).then((result) => {
      expect(result.error).to.eql(DB_ERRORS.PARAMETERS_VALIDATION_ERROR);
      expect(result.payload).to.be.array;
      expect(result.payload).to.be.null;
    }));

    it("Update fallido - Sin body", () => functions.update_city(fakeZipCode)
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.PARAMETERS_VALIDATION_ERROR);
      })
    );

    it("Update fallido - Body vacío", () => functions.update_city(fakeZipCode, {})
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.PARAMETERS_VALIDATION_ERROR);
      })
    );

    it("Update fallido - CityName ausente", () => functions.update_city(fakeZipCode, {
      ZipCode: fakeZipCode
    }).then((result) => {
      expect(result.error).to.eql(DB_ERRORS.PARAMETERS_VALIDATION_ERROR);
    }));

    it("Update fallido - ZipCode inexistente", () => functions.update_city("nonExistentZIP", {
      CityName: fakeCityName2
    }).then((result) => {
      expect(result.error).to.eql(DB_ERRORS.NO_ERROR);
      expect(result.payload).to.be.array;
      expect(result.payload).to.be.null;
    }));

    it("Update exitoso", () => functions.update_city(fakeZipCode, {
      CityName: fakeCityName2
    }).then((result) => {
      expect(result.error).to.eql(DB_ERRORS.NO_ERROR);
      expect(result.payload).to.be.array;
      expect(result.payload.ZipCode).to.eql(newCity.ZipCode);
      updatedCity = result.payload;
    }));
  });

  describe("Delete", () => {
    it("Eliminación fallida - Zip Code ausente", () => functions.delete_city()
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.NO_ERROR);
        expect(result.payload).to.be.array;
        expect(result.payload).to.be.null;
      }));

    it("Eliminación fallida - Zip Code no existente", () => functions.delete_city("nonExistentZIP")
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.NO_ERROR);
        expect(result.payload).to.be.array;
        expect(result.payload).to.be.null;
      })
    );

    it("Eliminación Exitosa", () => functions.delete_city(fakeZipCode)
      .then((result) => {
        expect(result.error).to.eql(DB_ERRORS.NO_ERROR);
        expect(result.payload).to.be.array;
        expect(result.payload.ZipCode).to.eql(newCity.ZipCode);
      })
    );
  });
});
