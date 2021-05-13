const ErrResponse = require('../utility/errorResponse');
const AsyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

module.exports.getCourses = AsyncHandler(async (req, res, next) => {
	let query;

	if (req.params.bootcampId) {
		query = Course.find({ bootcamp: req.params.bootcampId });
	} else {
		query = Course.find().populate({
			path: 'bootcamp',
			select: 'name description'
		});
	}

	const courses = await query;

	res.status(200).json({
		success: true,
		count: courses.length,
		data: courses
	});
});

module.exports.getCourse = AsyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id).populate({
		path: 'bootcamp',
		select: 'name description'
	});

	if (!course) {
		return next(new ErrResponse(`No course with id of ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: course
	});
});

module.exports.addCourse = AsyncHandler(async (req, res, next) => {
	req.body.bootcamp = req.params.bootcampId;
	const bootcamp = await Bootcamp.findById(req.params.bootcampId);

	if (!bootcamp) {
		return next(
			new ErrResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404)
		);
	}

	const course = await Course.create(req.body);

	res.status(200).json({
		success: true,
		data: course
	});
});

module.exports.updateCourse = AsyncHandler(async (req, res, next) => {
	let course = await Course.findById(req.params.id);

	if (!course) {
		return next(new ErrResponse(`No course with id of ${req.params.id}`, 404));
	}

	course = await Course.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		success: true,
		data: course
	});
});

module.exports.deleteCourse = AsyncHandler(async (req, res, next) => {
	let course = await Course.findById(req.params.id);

	if (!course) {
		return next(new ErrResponse(`No course with id of ${req.params.id}`, 404));
	}

	await course.remove();

	res.status(200).json({
		success: true,
		data: {}
	});
});
