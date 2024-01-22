const express = require('express');

const authRoute = require('./auth.route');
const carRoute = require('./car.route');

const router = express.Router();
router.use('/auth', authRoute);
router.use('/car', carRoute);

module.exports = router;
