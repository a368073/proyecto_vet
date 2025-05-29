const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasController');

router.post('/', consultasController.createConsulta);
router.get('/', consultasController.getAllConsultas);
router.get('/mascotas', consultasController.getMascotasForSelect);

module.exports = router;