const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

router.post('/', citasController.createCita);
router.get('/', citasController.getAllCitas);
router.get('/select-data', citasController.getSelectData);

module.exports = router;