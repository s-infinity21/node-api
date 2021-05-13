const ErrResponse = require('../utility/errorResponse');
const AsyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

module.exports.getBootCamps = AsyncHandler(async (req, res, next) => {
	let query;
	const reqQuery = { ...req.query };
	const removeFields = ['select', 'sort', 'page', 'limit'];
	removeFields.forEach(params => delete reqQuery[params]);
	let queryStr = JSON.stringify(reqQuery);
	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
	query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('-createdAt');
	}

	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 25;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await Bootcamp.countDocuments();

	query = query.skip(startIndex).limit(limit);

	const bootcamp = await query; //filtering values

	const pagination = {};
	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit
		};
	}
	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit
		};
	}

	res.status(200).json({
		success: true,
		pagination,
		data: bootcamp,
		count: bootcamp.length
	});
});

module.exports.getBootCamp = AsyncHandler(async (req, res, next) => {
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

module.exports.createBootCamp = AsyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.create(req.body);
	res.status(201).json({
		success: true,
		data: bootcamp
	});
});

module.exports.updateBootCamp = AsyncHandler(async (req, res, next) => {
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

module.exports.deleteBootCamp = AsyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) {
		return next(
			new ErrResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
		);
	}
	bootcamp.remove();
	res.status(201).json({
		success: true,
		data: {}
	});
});
