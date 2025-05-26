const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotasController');

router.post('/', mascotasController.createMascota);
router.get('/', mascotasController.getAllMascotas);
router.get('/duenos', mascotasController.getDuenosForSelect);

module.exports = router;