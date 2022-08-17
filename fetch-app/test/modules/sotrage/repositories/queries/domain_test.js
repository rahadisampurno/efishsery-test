const assert = require('assert');
const sinon = require('sinon');
const Domain = require('../../../../../modules/storage/repositories/queries/domain');
const globalData = global

const domain = new Domain();
describe('storage-domain',()=>{


  describe('listStorage',()=>{
    it('should return success to listStorage', async () => {
      globalData.storage = [{"name":"rahadi"}]
      const result = await domain.listStorage();
      assert.equal(result.code, 0);
    });
    it('should return failed to listStorage', async () => {
      delete globalData.storage 
      const result = await domain.listStorage();
      assert.equal(result.code, 500);
    });
  });

  describe('dataCounting',()=>{
    it('should return success to dataCounting', async () => {
      globalData.storage = [{"name":"rahadi","province":"JAWA_BARAT"}]
      const result = await domain.dataCounting({province:'JAWA_BARAT'});
      assert.equal(result.code, 0);
    });
    it('should return failed to dataCounting', async () => {
      delete globalData.storage 
      const result = await domain.dataCounting();
      assert.equal(result.code, 500);
    });
  });
});
