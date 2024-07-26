const app = require('./config')
const serverConfig = require('./server')
app.listen(serverConfig.serverConfig.port, () => {
    console.log(`Example app listening on port ${serverConfig.serverConfig.port}!`);
});