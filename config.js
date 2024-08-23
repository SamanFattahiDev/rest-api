const express = require("express");
const bodyParser = require("body-parser");
const userController = require('./controllers/user')
const jwtController = require('./controllers/account')
const mediaController = require('./controllers/media')
const app = express();
app.use(express.json())
app.use('/Users', userController)
app.use('/Account', jwtController)
app.use('/Media', mediaController)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = app
