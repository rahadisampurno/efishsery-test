const sinon = require('sinon');
const { expect } = require('chai');
const api = require ('.././../../../modules/storage/handlers/api_handler');
const queryHandler = require('.././../../../modules/storage/repositories/queries/query_handler');
const validator = require('.././../../../modules/storage/validator');

describe('storage-apihandler',() => {
  let res;
  beforeEach(() => {
    res = {
      send: function() {
        return true;
      }
    };
  });

  const req = {
    body: {},
    params: {province:'JAWA_BARAT'},
    query: {}
  };

  const resultSuccess = {
    code: 200,
    message: 'success',
  };

  const resultError = {
    status:false,
    code: 400,
    message: 'Mohon Maaf terjadi kesalahan pada sistem kami.',
  };

  describe('listStorage',() => {

    it('should payload not valid', async () => {
      sinon.stub(queryHandler,'listStorage').resolves({err:true,code:1,content:'string',total:0,result:[]});
      sinon.stub(validator, 'isValidPayload').resolves(resultError);
      expect(await api.listStorage(req, res));
      validator.isValidPayload.restore();
      queryHandler.listStorage.restore();
    });

    it('should success get data', async ()=>{
      sinon.stub(queryHandler,'listStorage').resolves({});
      sinon.stub(validator, 'isValidPayload').resolves(resultSuccess);
      expect(await api.listStorage(req, res));
      validator.isValidPayload.restore();
      queryHandler.listStorage.restore();
    });

  });

  describe('dataCounting',() => {

    it('should payload not valid', async () => {
      sinon.stub(queryHandler,'dataCounting').resolves({err:true,code:1,content:'string',total:0,result:[]});
      sinon.stub(validator, 'isValidPayload').resolves(resultError);
      expect(await api.dataCounting(req, res));
      validator.isValidPayload.restore();
      queryHandler.dataCounting.restore();
    });

    it('should success get data', async ()=>{
      sinon.stub(queryHandler,'dataCounting').resolves({req});
      sinon.stub(validator, 'isValidPayload').resolves(resultSuccess);
      expect(await api.dataCounting(req, res));
      validator.isValidPayload.restore();
      queryHandler.dataCounting.restore();
    });

  });
});
