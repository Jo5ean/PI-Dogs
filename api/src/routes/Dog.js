const { Router } = require('express');
//importamos funciones del controlador
const { postDogs, getDog, getDogsByName } = require('../controller/Dog.controller');

const router = Router();

// ------- localhost:3000/dogs/ --------
//GET
// router.get('/get', getDogs);
router.get('/get/:idRaza', getDog);
router.get('/get', getDogsByName);
//POST
router.post('/post', postDogs);

module.exports = router;