const express = require('express');
const router = express.Router();
const tratamientosController = require('../controllers/tratamientosController');

router.post('/', tratamientosController.createTratamiento);
router.get('/', tratamientosController.getAllTratamientos);
router.get('/consultas', tratamientosController.getConsultasForSelect);

module.exports = router;