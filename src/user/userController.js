let userService = require('./userServices');

let createUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);
    let status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

//async - await
let loginUserControllerFunc = async (req, res) => {
    let result = null;
    try {
        result =  await userService.loginuserDBService(req.body);
        console.log(result);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

let finduserControllerFunc = async (req, res) => {
    let result = await userService.finduserDBService(req.body);
    console.log("Controller")
    console.log(result)
    try {
        if(result.status){
            res.send({ "status": true,  "user": result.nombre, "lastname": result.apellido, "email": result.email })
        }
    } catch (error){
        console.log(error)
        res.send({ "status": false, "message": "Usuario No Existente" });
    }
}

let deleteuserControllerFunc = async (req, res) => {
    try{
        console.log("Soy del controller eliminar")
        let result = await userService.deleteuserDBService(req.body);
        if(result.status){
            res.send({ "status": true, "message": result.msg })
        }
    } catch(error) {
        console.log("Entro en el Controller (Catch) ")
        console.log(error)
        res.send({ "status": false, "message": "Usuario No Existente o No Se Pudo Eliminar" });
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, finduserControllerFunc, deleteuserControllerFunc };