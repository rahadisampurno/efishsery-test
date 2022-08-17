const AppServer = require('./app/server');
const globalConfig = require('./infra/global_config');
const appServer = new AppServer();
const db = require('./init.js')

const port = globalConfig.get('/port') || 1337;

appServer.server.listen(port, () => {
  const ctx = 'app-listen';
  db.createConnection()
  console.log(ctx, `${appServer.server.name} started, listening at ${appServer.server.url}`, 'initate application');
});
