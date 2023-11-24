let expect = require('chai').expect;
let modulo = require('../modulo/modulo.js');

describe("Pruebas a la función de área de triángulo", () => {
    
    it('Si le mando base 3 y altura 4, debe regresar 6', () => {
        let resultado = modulo.areaTriangulo(3, 4);
        expect(resultado).to.be.a("number");
        expect(resultado).to.equal(6);
    });

    it('Si le mando base 5 y altura 2, debe regresar 5', () => {
        let resultado = modulo.areaTriangulo(5, 2);
        expect(resultado).to.be.a("number");
        expect(resultado).to.equal(5);
    });
});
