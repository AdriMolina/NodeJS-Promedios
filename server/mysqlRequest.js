const view = require ('../view/mysqlViews');

//CREAMOS LAS VISTAS
module.exports = (app) => {
    //PETICION GET PARA OBTENER LOS CLIENTES
    app.post('/clientes', (request, respod) => {
        let total = request.body.total;
        let puntoVenta = request.body.puntoVenta;
        let clave = request.body.clave;

        if(total && puntoVenta && clave){
            view.getClientes(total,puntoVenta,clave,request, respod);
        }else{
            console.log("No entra");
        }

        
    })
}

module.exports = (app) => {
    //PETICION GET PARA OBTENER LOS CLIENTES
    app.get('/clientes', (request, respod) => {
            view.getPromedios(request,respod);

        
    })
}