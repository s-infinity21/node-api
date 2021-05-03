const express = require('express');
const bootController = require('../controllers/bootcamps');
const router = express.Router();

router
	.route('/')
	.get(bootController.getBootCamps)
	.post(bootController.createBootCamp);
router
	.route('/:id')
	.get(bootController.getBootCamp)
	.put(bootController.updateBootCamp)
	.delete(bootController.deleteBootCamp);

module.exports = router;
