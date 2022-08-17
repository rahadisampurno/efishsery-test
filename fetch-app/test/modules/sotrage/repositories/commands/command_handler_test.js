const sinon = require('sinon');
const assert = require('assert');
const commandHandler = require('../../../../../modules/storage/repositories/commands/command_handler');
const domainHandler = require('../../../../../modules/storage/repositories/commands/domain');

describe('storage-commandHandler',()=>{
  const params = {};

  describe('insertFieldPrice', ()=>{

    it('should return success update', async () => {
      sinon.stub(domainHandler.prototype,'insertFieldPrice').resolves({code:200});
      const result = await commandHandler.insertFieldPrice(params);
      assert.equal(result.code, 200);
      domainHandler.prototype.insertFieldPrice.restore();
    });

    it('should success update data', async ()=>{
      sinon.stub(domainHandler.prototype,'insertFieldPrice').resolves({code:400});
      const result = await commandHandler.insertFieldPrice(params);
      assert.equal(result.code, 400);
      domainHandler.prototype.insertFieldPrice.restore();
    });
  });
});
