const restify = require('restify');
const project = require('../package.json');
const wrapper = require('../helpers/utils/wrapper')
const storage = require('../modules/storage/handlers/api_handler')
const jwtAuth = require('../auth/jwt');
const role = require('../auth/role');


function AppServer() {
    this.server = restify.createServer({
      name: `${project.name}-server`,
      version: project.version
    });

    this.server.serverKey = '';
    this.server.use(restify.plugins.acceptParser(this.server.acceptable));
    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.bodyParser());
    this.server.use(restify.plugins.authorizationParser())
  
    this.server.get('/', (req, res) => {
      wrapper.response(res, 'success', 'Index', 'Efishery service is running properly');
    });

this.server.post('/efishery/storage/insert-price-idr', jwtAuth.verifyToken,storage.insertFieldPrice)
this.server.get('/efishery/storage/list-storage', jwtAuth.verifyToken,storage.listStorage)
this.server.get('/efishery/storage/data-aggregation', jwtAuth.verifyToken,role.roleAdmin,storage.dataCounting)
  
}

module.exports = AppServer;