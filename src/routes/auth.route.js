const express = require('express');
const validate = require('../middlewares/validate');
const { authValidation } = require('../validations');
const { authController } = require('../controllers');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: APIs for user registration and login
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserRegistration'
 *     responses:
 *       '200':
 *         description: Successfully registered a new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserRegistration'
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate and log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserLogin'
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *
 */
router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);

module.exports = router;
