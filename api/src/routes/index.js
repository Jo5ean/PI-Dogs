const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogRouter = require('./Dog')
const tempRouter = require('./Temp')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogRouter);
router.use('/temps', tempRouter);

module.exports = router;
