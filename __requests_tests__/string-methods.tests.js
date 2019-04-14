"use strict";

const HTTP_STATUS = require("../helpers/constants").HTTP_STATUS;
const HEADERS = require("../helpers/constants").HEADERS;
const TOKENS = require("../helpers/constants").TOKENS;

const chai = require("chai");
const expect = chai.expect;

const chai_http = require("chai-http");
chai.use(chai_http);

const server = require("../src/server").server;
var requester = chai.request(server).keepOpen();

describe("Test de metodos /case", () => {
  it("String to upper v1.0.0 - GET", () => {
    var text = "sampleText";

    return requester
      .get(`/samples/case/${text}`)
      .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
      .set(HEADERS.ACCEPT_VERSION, "1.0.0")
      .then((response) => {
        expect(response).to.have.status(HTTP_STATUS.OK);
        expect(response).to.be.json;
        expect(response.body.result).to.be.eql(text.toLowerCase());
      })
      .catch((error) => {
        throw error;
      });
  });

  it("Resta de valores numéricos positivos - GET", () => requester
    .get("/samples/math/20/10")
    .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
    .set(HEADERS.ACCEPT_VERSION, "1.5.1")
    .then((response) => {
      expect(response).to.have.status(HTTP_STATUS.OK);
      expect(response).to.be.json;
      expect(response.body.result).to.be.eql(10);
    })
    .catch((error) => {
      throw error;
    })
  );

  it("Multiplicación de valores numéricos positivos - GET", () => requester
    .get("/samples/math/20/10")
    .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
    .set(HEADERS.ACCEPT_VERSION, "1.9.0")
    .then((response) => {
      expect(response).to.have.status(HTTP_STATUS.OK);
      expect(response).to.be.json;
      expect(response.body.result).to.be.eql(200);
    })
    .catch((error) => {
      throw error;
    })
  );

  it("Llamado sin version, debe retornar la más actual (División) - GET", () => requester
    .get("/samples/math/20/10")
    .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
    .then((response) => {
      expect(response).to.have.status(HTTP_STATUS.OK);
      expect(response).to.be.json;
      expect(response.body.result).to.be.eql(2);
    })
    .catch((error) => {
      throw error;
    })
  );
});

describe("Tests de errores", () => {
  it("Versión inválida solicitada - GET", () => requester
    .get("/samples/math/20/10")
    .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
    .set(HEADERS.ACCEPT_VERSION, "1.9.2")
    .then((response) => {
      expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      expect(response).to.be.json;
    })
    .catch((error) => {
      throw error;
    })
  );

  it("Request sin authorization token - GET", () => requester
    .get("/samples/math/20/10")
    .set(HEADERS.ACCEPT_VERSION, "1.0.0")
    .then((response) => {
      expect(response).to.have.status(HTTP_STATUS.UNAUTHORIZED);
      expect(response).to.be.json;
    })
    .catch((error) => {
      throw error;
    })
  );

  it("Request con authorization token inválido - GET", () => requester
    .get("/samples/math/20/10")
    .set(HEADERS.AUTHORIZATION, "invalid_token")
    .then((response) => {
      expect(response).to.have.status(HTTP_STATUS.UNAUTHORIZED);
      expect(response).to.be.json;
    })
    .catch((error) => {
      throw error;
    })
  );

  it("Primer parámetro no numérico - GET", () => requester
    .get("/samples/math/XX/10")
    .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
    .then((response) => {
      expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      expect(response).to.be.json;
    })
    .catch((error) => {
      throw error;
    })
  );

  it("Segundo parámetro no numérico - GET", () => requester
    .get("/samples/math/20/XX")
    .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
    .then((response) => {
      expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      expect(response).to.be.json;
    })
    .catch((error) => {
      throw error;
    })
  );

  it("Ambos parámetros no numéricos - GET", () => requester
    .get("/samples/math/XX/YY")
    .set(HEADERS.AUTHORIZATION, TOKENS.AUTHORIZATION_TOKEN)
    .then((response) => {
      expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      expect(response).to.be.json;
    })
    .catch((error) => {
      throw error;
    })
  );
});
