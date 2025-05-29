const express = require('express');
const router = express.Router();
const duenosController = require('../controllers/duenosController');

router.post('/', duenosController.createDueno);
//que salgan en la lista
router.get('/', duenosController.getAllDuenos);

module.exports = router;