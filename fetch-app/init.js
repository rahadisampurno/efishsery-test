const RequestPromise = require('./RequestPromise')
global.productLocation = []
global.storage = [];
const createConnection = async () => {
let storage =  await RequestPromise.prototype.storages()



storage.map(e=>{global.storage.push(e)})
  return true;
};

module.exports =   {
    createConnection
}
