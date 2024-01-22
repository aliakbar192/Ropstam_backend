const express = require('express');
const validate = require('../middlewares/validate');
const { carValidation } = require('../validations');
const { carController } = require('../controllers');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/createCar', auth(), validate(carValidation.create), carController.createCar);
router.post('/getAllCarsByUserId', auth(), validate(carValidation.getAllCarByUserId), carController.getAllCarsByUserId);
router.delete('/:id', auth(), validate(carValidation.deleteCarById), carController.deleteRecordById);
router.get('/:id', auth(), validate(carValidation.getOneCarById), carController.getOneCarById);
router.put('/:id', auth(), validate(carValidation.UpdateCarById), carController.updateCarById);
/**
 * @swagger
 * /api/car/createCar:
 *   post:
 *     summary: Create a new car
 *     tags:
 *       - Car
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Car'
 *     responses:
 *       200:
 *         description: Successfully created car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Car'
 */

/**
 * @swagger
 * /api/car/getAllCarsByUserId:
 *   post:
 *     summary: Get all cars by user ID
 *     tags:
 *       - Car
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/GetAllCarsByUserIdRequest'
 *     responses:
 *       200:
 *         description: Successfully retrieved cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Car'
 */

/**
 * @swagger
 * /api/car/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     tags:
 *       - Car
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Car ID to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Car'
 */

/**
 * @swagger
 * /api/car/{id}:
 *   get:
 *     summary: Get a car by ID
 *     tags:
 *       - Car
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Car ID to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Car'
 */

/**
/**
 * @swagger
 * /api/car/{id}:
 *   put:
 *     summary: Update a car by ID
 *     tags:
 *       - Car
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Car ID to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Car'
 *     responses:
 *       200:
 *         description: Successfully updated car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Car'
 */

module.exports = router;
