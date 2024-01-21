const express = require('express');

const docsRoute = require('./doc.route');
const authRoute = require('./auth.route');

const router = express.Router();
router.use('/documentation', docsRoute);
router.use('/auth', authRoute);

module.exports = router;
