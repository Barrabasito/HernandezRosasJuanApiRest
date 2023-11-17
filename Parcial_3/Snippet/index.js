
//GENERADOR DE CODIGO AL CLIENTE COMO EJEMPLO PARA LA DOCUMENTACION
//Instalar OpenAPI Snippet
const OpenAPISnippet = require('openapi-snippet')

fetch("http://localhost:8084/api-docs-json")
.then(respuesta => respuesta.json())
.then(desc => {

console.log(desc)

// define input:
const openApi = desc;
const targets = ['javascript_xhr', 'go_native'] // array of targets for code snippets. See list below...

try {
  // either, get snippets for ALL endpoints:
  //const results = OpenAPISnippet.getSnippets(openApi, targets) // results is now array of snippets, see "Output" below.
  // ...or, get snippets for a single endpoint:
 const results2 = OpenAPISnippet.getEndpointSnippets(openApi, '/clientes/', 'get', targets)
 console.log(results2);
} catch (err) {
    console.log("Ocurrio un error :(");
  // do something with potential errors...
}
});
//node index.js