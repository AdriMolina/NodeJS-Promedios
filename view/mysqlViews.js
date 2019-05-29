const controller = require('../controller/mysqlDAO');

//VISTA QUE MUESTRA LOS CLIENTES
function getClientes(total, puntoVenta, clave ,request,respond){

    controller.insertarBolsa(total,puntoVenta,clave).then((resultado) => {
        respond.status(200).send(resultado);

        //SI OBTENEMOS UN ERROR
    }).catch((error) => {
        let elemento = {'mensaje': error.mensaje, 'error': error.error};
        respond.status(error.codigo).send(JSON.stringify(elemento));

    });
}

//VISTA QUE MUESTRA LOS CLIENTES
function getPromedios(request,respond){

    let resultado = controller.procesoPromedios();
    console.log(resultado);

    return resultado;
}

exports.getClientes = getClientes;
exports.getPromedios = getPromedios;