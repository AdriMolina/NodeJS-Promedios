//EXPRESS NOS PERMITE LEVANTAR UN SERVIDOR
const express = require('express');
const bodyParser = require('body-parser');

//CREAMOS NUESTRA INSTANCIA DE EXPRESS
const app = express();

//DEFINIMOS NUESTRAS PROPIEDADES DEL CUERPO DE NUESTRAS PETICIONES
app.use(bodyParser.json());
//PERMITIMOS QUE NUESTRA API RECIBA CARACTERES ESPECIALES
app.use(bodyParser.urlencoded({extended:true}));

//EN ESTE ESPACIO AGREGAREMOS LOS ARCHIVOS DE NUESTRAS PETICIONES
require('./server/mysqlRequest')(app);
require('./server/request')(app);
//FUNCION QUE EJECUTARA EL SERVIDOR
function init(){
    //CREAMOS EL SERVIDOR Y AGREGAMOS EL PUERTO NECESARIO
    app.listen(3000, () => {
        console.log("Servidor escuchando por el puerto 3000");
    });

}

//EJECUTAMOS LA FUNCION
init();