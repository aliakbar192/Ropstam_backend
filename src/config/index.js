const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('./cors');
const app = express();
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const routes = require('../routes');
const { httpStatus, message } = require('../utils/constant');
const passport = require('passport');
const { jwtStrategy } = require('./passport');
const swagger = require('../swager');
require('dotenv').config();

// Setup BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup CookieParser
app.use(cookieParser());

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// setup cors
cors(app);

// Set Content Security Policy (CSP) headers
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; frame-src 'self'; object-src 'self'; media-src 'self'",
    );
    return next();
});

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// api routes
app.use('/api', routes);
app.use('/api-docs', swagger.serve, swagger.setup);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND));
});

// connect mongoDb Cluster
mongoose
    .connect(`${process.env.Database}`)
    .then(() => console.log('connected to database'))
    .catch(() => console.error('could not connect'));
mongoose.set('bufferTimeoutMS', 30000);

// handle error
require('./error')(app);
//export app
module.exports = app;
