const express = require('express')
const {response} = require("express");
const router = express.Router();
const userService = require('../services/user')
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: A product object
 *       404:
 *         description: Product not found
 */
router.get('/get', userService.getUser)


module.exports = router