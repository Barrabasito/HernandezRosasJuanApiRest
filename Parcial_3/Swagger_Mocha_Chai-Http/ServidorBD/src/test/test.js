//npm i mocha
//chai
//chai-http

const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
let expect=require('chai').expect;


chai.use(chaiHttp);

let app='http://localhost:8084';

describe("Pruebas a la ruta cliente", () => {
  it("Probando método GET a la ruta usuario debe dar un status 200", (done) => {
    chai.request(app)
      .get('/clientes')
      .end((err, res) => {
        if (err) {
          done(err); // Indica que hubo un error en la prueba
          return;
        }
        expect(res).to.have.status(200);
        done(); // Indica que la prueba se completó correctamente
      });
  });
});