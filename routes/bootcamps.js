const express = require('express');
const bootController = require('../controllers/bootcamps');
const courseRouter = require('./courses');

const router = express.Router();

router.use('/:bootcampId/courses', courseRouter);

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
