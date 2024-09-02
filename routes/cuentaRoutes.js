const express = require('express');
const router = express.Router();
const cuentaController = require('../controllers/cuentaController');

router.get('/cuentas', cuentaController.listarCuentas);
router.post('/cuentas', cuentaController.crearCuenta);
router.put('/cuentas/consignar', cuentaController.consignarDinero);
router.put('/cuentas/retirar', cuentaController.retirarDinero);
router.delete('/cuentas/:numeroCuenta', cuentaController.eliminarCuenta);

module.exports = router;
