const mysql = require('mysql');
const constants = require('../model/constants');

function mensajeError(error){
    return {'error':error,
    'mensaje': 'No es posible realizar la consulta',
    'codigo': 501}
}

//FUNCION PARA LA CONEXION DE MYSQL DE RECARGAS
function conexion(){
    return new Promise((resolve,reject) => {
        let conexion = mysql.createConnection(constants.mysqlObject);

        conexion.connect((error) => {
            if (error)
                reject(mensajeError(error));
            else
                resolve(conexion);
        })
    })
}

//FUNCION PARA LA CONEXION DE MYSQL DE ATCBD
function conexionAtc(){
    return new Promise((resolve,reject) => {
        let conexion = mysql.createConnection(constants.mysqlAtc);

        conexion.connect((error) => {
            if (error)
                reject(mensajeError(error));
            else
                resolve(conexion);
        })
    })
}

//FUNCION DONDE OBTENDREMOS LA LISTA DE CLIENTES GENERAL
function clientes(){

    //ARMAMOS NUESTRA PROMESA
    return new Promise((resolve, reject) => {
        
        //EJECUTAMOS LA CONSULTA
        conexion().then((connection) => {
            //CONSULTA PARA OBTENER LOS CLIENTES
            let query = 'SELECT id AS id FROM cliente where activo = 1;';

            connection.query(query, (error,resultado) => {
                if(error)
                    reject(mensajeError(error));
                else
                    resolve(resultado);

            })
        }).catch((error) => {
            reject(error);
        });

    })

}

function promedio (cliente_id, mes, anio){
    
    return new Promise ((resolve, reject) => {

        //EJECUTAMOS LA CONEXION
        conexion().then((connection) => {
            let query = "SELECT ifnull((round(((COUNT(recargasatc.a.id)/30)+0.5))),0) AS promedio," 
            +" pv.tipo AS puntoVenta, cc.numero AS clave"
            +" FROM activado a"
            +" INNER JOIN numero n ON a.numero_id = n.id"
            +" INNER JOIN cliente c ON n.cliente_id = c.id"
            +" INNER JOIN clave_cliente cc ON cc.cliente_id = c.id"
            +" INNER JOIN punto_venta pv ON cc.puntoventa_id = pv.id"
            +" WHERE n.cliente_id = ?"
            +" AND month(a.fecha) = ?"
            +" AND year(a.fecha) = ?;";

            connection.query(query, [cliente_id, mes, anio], (error,resultado) => {
                if(error){
                    reject(mensajeError(error));
                 }else{
                    resolve(resultado);

                 }
            });
        });
    })
}

function insertarBolsa(total,puntoVenta,clave){
    return new Promise ((resolve, reject) => {
        conexionAtc().then((connection) => {
            let query = "INSERT INTO bolsarecarga(total, puntoVenta, clave) values (?, ?,?);";

            connection.query(query,[total,puntoVenta,clave], (error, resultado) =>{
                if(error){
                    reject(mensajeError(error));
                }else{
                    resolve(resultado);
                }
            });

        })
    })
}

function fecha(){
     

var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1;
var yyyy = hoy.getFullYear();

console.log(mm);

return mm;
}

function anio(){
    var hoy = new Date();
    var yyyy = hoy.getFullYear();
    
    console.log(yyyy);
    
    return yyyy;
    
}

function mes(){
    var hoy = new Date();
    var mm = hoy.getMonth()+1;
    console.log(mm);
    
    return yyyy;
    
}

async function procesoPromedios (){

   
    //OBTENDREMOS LOS CLIENTES
    let clientes = await this.clientes();

    let long = clientes.length;
    for(let i = 0; i< long; i++){
        let cliente_id = (clientes[i].id);
        let mes = this.mes();
        let anio = this.anio();
        let promedio = await this.promedio(cliente_id, mes, anio);
        console.log(promedio);
    }

    return promedio;
    //console.log(clientes);
}

exports.clientes = clientes;
exports.promedio = promedio
exports.insertarBolsa = insertarBolsa;
exports.procesoPromedios = procesoPromedios;
exports.fecha = fecha;
