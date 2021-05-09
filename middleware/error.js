const ErrResponse = require('../utility/errorResponse');
const errHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	console.log(err);

	// moongoose bad objectid
	if (err.name === 'CastError') {
		const message = `Bootcamp not found with id ${err.value}`;
		error = new ErrResponse(message, 404);
	}

	// moongoose dublicate field
	if (err.code === 11000) {
		const message = Object.values(err.error).map(val => val.message);
		error = new ErrResponse(message, 400);
	}

	// moongoose validation error
	if (err.name === 'ValidationError') {
		const message = `Bootcamp not found with id ${err.value}`;
		error = new ErrResponse(message, 404);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Server Error'
	});
};

module.exports = errHandler;
