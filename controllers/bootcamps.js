const Bootcamp = require('../models/Bootcamp');

exports.getBootCamps = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.find();
		res.status(200).json({
			success: true,
			data: bootcamp
		});
	} catch (err) {
		res.status(400).json({
			success: false
		});
	}
};

exports.getBootCamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findById(req.params.id);
		res.status(200).json({
			success: true,
			data: bootcamp
		});
	} catch (err) {
		res.status(400).json({
			success: false
		});
	}
};

exports.createBootCamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.create(req.body);
		res.status(201).json({
			success: true,
			data: bootcamp
		});
	} catch (err) {
		res.status(400).json({
			success: false
		});
	}
};

exports.updateBootCamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		res.status(201).json({
			success: true,
			data: bootcamp
		});
	} catch (err) {
		res.status(400).json({
			success: false
		});
	}
};

exports.deleteBootCamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
		res.status(201).json({
			success: true,
			data: {}
		});
	} catch (err) {
		res.status(400).json({
			success: false
		});
	}
};
