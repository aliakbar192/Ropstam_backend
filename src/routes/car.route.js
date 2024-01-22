const express = require('express');
const validate = require('../middlewares/validate');
const { carValidation } = require('../validations');
const { carController } = require('../controllers');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/createCar', auth(), validate(carValidation.create), carController.createCar);
router.post('/getAllCarsByUserId', auth(), validate(carValidation.getAllCarByUserId), carController.getAllCarsByUserId);
router.delete('/:id', auth(), validate(carValidation.deleteCarById), carController.DeleteReocrdBtId);
router.get('/:id', auth(), validate(carValidation.getOneCarById), carController.getOneCarById);
router.put('/:id', auth(), validate(carValidation.UpdateCarById), carController.UpdateCarById);

module.exports = router;
