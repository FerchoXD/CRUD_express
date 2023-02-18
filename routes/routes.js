let express = require('express');

let userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
//ruta para buscar un usuario
router.route('/user/find').get(userController.finduserControllerFunc);
//ruta para borrar un usuario
router.route('/user/delete').delete(userController.deleteuserControllerFunc);

module.exports = router;