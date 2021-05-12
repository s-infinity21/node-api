const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const connectDB = require('./config/db');
const errHandler = require('./middleware/error');

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 3000;

connectDB();

const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

app.use(express.json());

app.use(logger);
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use(errHandler);

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port number ${PORT}`
	)
);

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err}`);
	server.close(() => process.exit(1));
});
