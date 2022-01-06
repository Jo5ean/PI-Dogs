const { Router } = require('express');
//importamos funciones del controlador
const { getDogs, postDogs } = require('../controller/Dog.controller');

const router = Router();

// ------- localhost:3000/dogs/ --------
//GET
router.get('/get', getDogs);
//POST
router.post('/post', postDogs);

module.exports = router;