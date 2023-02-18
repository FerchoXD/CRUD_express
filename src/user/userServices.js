let userModel = require('./userModel');
let key = 'somekey234567884456753456';
let encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
       let userModelData = new userModel();

       userModelData.firstname = userDetails.firstname;
       userModelData.lastname = userDetails.lastname;
       userModelData.email = userDetails.email;
       userModelData.password = userDetails.password;
       let encrypted = encryptor.encrypt(userDetails.password);
       userModelData.password = encrypted;

       userModel.findOne({"$and": [{ email: userDetails.email }] }, function search(req, res){
         try {
            if(userModelData.email == res.email){
               console.log("el usuario ya exixte")
            }else{
               userModelData.save(function resultHandle(error, result) {
                  if (error) {
                      reject(false);
                  } else {
                      resolve(true);
                  }
              });
            }
         } catch (e) {
            reject("Error")
         }
      } )
       
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email },function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               let decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.finduserDBService = (userDetails) => {
   //retorna la promesa del controlador
   return new Promise(function findDocument(resolve, reject){
      //validando si existe db.collection.findOne(query, projection, options)
      userModel.findOne({"$and": [{ firstname: userDetails.firstname, email: userDetails.email }] }, function search(req, res){
         //resivo si exixte algo si no mando un error 
         try {
            if(res !== null){
               //en caso de ser verdadero devuelvo un true con los datos del usuario
               console.log("Verdadero")
               resolve({ status: true, nombre: res.firstname, apellido: res.lastname, email: res.email });
            }else{
               // en caso de que no devuelvo un false con el mensaje de Usuario No Existente
               reject({ status: false, msg: "Usuario No Existente" });
            }
         } catch (e) {
            reject("Error")
         }
      } )
   }).catch((error) => {
      console.log(error)
   })
}

module.exports.deleteuserDBService = (userDetails) => {
   ///retornando promesa
   return new Promise(function findDocument(resolve, reject){
      //busco si el usuario existe
      userModel.findOne({"$and": [{ firstname: userDetails.firstname, email: userDetails.email }] }, function search(req, res){
         try {
            if(res !== null){
               //desencripto la contraseña 
               let desencriptado = encryptor.decrypt(res.password);
               //valido la contraseña
               if(desencriptado === userDetails.password){
                  //elimino el usuario en caso de que si exista y las contraseñas sean iguales
                  userModel.deleteOne({"$and": [{ firstname: userDetails.firstname, lastname: userDetails.lastname, email: userDetails.email }] }, function deleteUser(req, res){
                  //hago un try para enviar el status de el usuario eliminiado o no exixtente 
                     try {
                        if(res.deletedCount === 1){
                           console.log("Verdadero")
                           resolve({ status: true, msg: "Usuario Eliminado" });
                        }else {
                           console.log("Falso")
                           reject({ status: false, msg: "Usuario No Existente" });
                           console.log("Envio")
                        }
                     } catch (e) {
                        reject({ status: false, msg: "ocurrio una excepcion" })
                     }
                  })
               }else{
                  reject({ status: false, msg: "contraseña incorrecta" })
               }
            }else{
               reject({ status: false, msg: "fallo correctamente" })
            }
         } catch (e) {
            console.log("Error")
         }
      } )
   })
}