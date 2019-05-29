//OBJETO PARA ACCEDER AL SERVIDOR PRUEBAS
let phpObjectPruebas = {
    hostname : '192.168.1.178',
    port : 80,
    method : 'POST',
    headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
};

let mysqlObject = {
    host : '192.168.1.178',
    user : 'xampp',
    password : 'marquesada?466',
    database : 'recargasatc',
    port : 3306
};

let mysqlAtc = {
    host : '192.168.1.178',
    user : 'xampp',
    password : 'marquesada?466',
    database : 'atcbd',
    port : 3306
};

exports.mysqlObject = mysqlObject;
exports.mysqlAtc = mysqlAtc;
exports.phpObjectPruebas = phpObjectPruebas;