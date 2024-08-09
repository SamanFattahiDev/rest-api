const app = require('./config')
require("dotenv").config();
const serverConfig = require('./server')
const db = require('./models/index');
const {closeSQLConnection} = require("./middlewares/globalMiddlewares");

// Sync the database and create tables if they don't exist
(async () => {
    try {
        await db.sequelize.sync(); // Sync models with database
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error during database sync:', error);
    }
})();

app.use(closeSQLConnection);


app.listen(serverConfig.serverConfig.port, () => {
    console.log(`Example app listening on port ${serverConfig.serverConfig.port}!`);
});