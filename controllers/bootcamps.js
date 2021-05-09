const ErrResponse = require('../utility/errorResponse');
const AsyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

exports.getBootCamps = AsyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.find();
	res.status(200).json({
		success: true,
		data: bootcamp
	});
});

exports.getBootCamp = AsyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) {
		return next(
			new ErrResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		success: true,
		data: bootcamp
	});
});

exports.createBootCamp = AsyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.create(req.body);
	res.status(201).json({
		success: true,
		data: bootcamp
	});
});

exports.updateBootCamp = AsyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	if (!bootcamp) {
		return next(
			new ErrResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(201).json({
		success: true,
		data: bootcamp
	});
});

exports.deleteBootCamp = AsyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
	if (!bootcamp) {
		return next(
			new ErrResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(201).json({
		success: true,
		data: {}
	});
});
