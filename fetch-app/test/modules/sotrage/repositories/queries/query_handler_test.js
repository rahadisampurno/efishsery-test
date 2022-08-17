const sinon = require('sinon');
const assert = require('assert');
const queriesHandler = require('../../../../../modules/storage/repositories/queries/query_handler');
const domainHandler = require('../../../../../modules/storage/repositories/queries/domain');

describe('storage-queriesHandler',()=>{
  const params = {};

  describe('listStorage', ()=>{

    it('should return success update', async () => {
      sinon.stub(domainHandler.prototype,'listStorage').resolves({code:200,});
      const result = await queriesHandler.listStorage(params);
      assert.equal(result.code, 200);
      domainHandler.prototype.listStorage.restore();
    });

    it('should success update data', async ()=>{
      sinon.stub(domainHandler.prototype,'listStorage').resolves({code:400,message:'error'});
      const result = await queriesHandler.listStorage(params);
      assert.equal(result.code, 400);
      domainHandler.prototype.listStorage.restore();
    });
  });

  describe('dataCounting', ()=>{

    it('should return success update', async () => {
      sinon.stub(domainHandler.prototype,'dataCounting').resolves({code:200});
      const result = await queriesHandler.dataCounting(params);
      assert.equal(result.code, 200);
      domainHandler.prototype.dataCounting.restore();
    });

    it('should success update data', async ()=>{
      sinon.stub(domainHandler.prototype,'dataCounting').resolves({code:400,message:'error'});
      const result = await queriesHandler.dataCounting(params);
      assert.equal(result.code, 400);
      domainHandler.prototype.dataCounting.restore();
    });
  });

  
});
