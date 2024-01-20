const express = require("express");

const docsRoute=require('./doc.route')
const router = express.Router();
router.use("/documentation", docsRoute);
module.exports = router;    