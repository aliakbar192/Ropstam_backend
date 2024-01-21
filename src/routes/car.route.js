const express = require('express');
const validate = require('../middlewares/validate');
const { carValidation } = require('../validations');
const { carController } = require('../controllers');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/createCar', auth(), validate(carValidation.create), carController.createCar);
router.get('/:userId', auth(), validate(carValidation.getAllCarByUserId), carController.getAllCarsByUserId);

module.exports = router;
