const express = require("express");
const bodyParser = require("body-parser");
const userController = require('./controllers/user')
const app = express();
app.use(bodyParser.json())
app.use('/users', userController)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = app
