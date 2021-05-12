const ErrResponse = require('../utility/errorResponse');
const AsyncHandler = require('../middleware/async');
const Course = require('../models/Course');

module.exports.getCourses = AsyncHandler(async (req, res, next) => {
	let query;

	if (req.params.bootcampId) {
		query = Course.find({ bootcamp: req.params.bootcampId });
	} else {
		query = Course.find();
	}

	const courses = await query;

	res.status(200).json({
		success: true,
		count: courses.length,
		data: courses
	});
});
