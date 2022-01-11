const { Router } = require('express');
const { getTemps } = require('../controller/Temp.controller');
const router = Router();

//las request que lleguen a este punto es por que antes dicen:
//"https://localhost:3000/api/temp"


//GET Temps
router.get('/getTemps', getTemps)

module.exports = router;