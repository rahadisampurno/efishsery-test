const assert = require('assert');
const sinon = require('sinon');
const Domain = require('../../../../../modules/storage/repositories/commands/domain');
const globalData = global

const domain = new Domain();
describe('storage-domain',()=>{


  describe('insertFieldPrice',()=>{
    it('should return success to insertFieldPrice', async () => {
      globalData.storage = [{"name":"rahadi"}]
      const result = await domain.insertFieldPrice();
      assert.equal(result.code, 0);
    });
    it('should return failed to insertFieldPrice', async () => {
      delete globalData.storage 
      const result = await domain.insertFieldPrice();
      assert.equal(result.code, 500);
    });
  });
});
