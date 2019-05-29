module.exports = (app) => {
    app.get('*', (request,respond) => {
        let respuesta = {respuesta : "No existen elementos para la petición"};
        respond.status(404).send(JSON.stringify(respuesta));
    });
}