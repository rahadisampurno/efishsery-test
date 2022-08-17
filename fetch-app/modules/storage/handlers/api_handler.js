const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const queryHandler = require('../repositories/queries/query_handler');
const commandModel = require('../repositories/commands/command_model');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../validator');

const insertFieldPrice = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.insertFieldPrice);
  const insertfieldprice = async (result) => {
    return (result.err) ? result.message : await commandHandler.insertFieldPrice(payload);
  };
  const sendResponse = (result) => {
    (result.code === 0) ? wrapper.handler(res, result) : wrapper.handlerError(res, result);
  };
  sendResponse(await insertfieldprice(validatePayload));
};

const listStorage = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, queryModel.listStorage);
  const liststorage = async (result) => {
    return (result.err) ? result.message : await queryHandler.listStorage(payload);
  };
  const sendResponse = (result) => {
    (result.code === 0) ? wrapper.handler(res, result) : wrapper.handlerError(res, result);
  };
  sendResponse(await liststorage(validatePayload));
};

const dataCounting = async (req, res) => {
  const payload = req.query;
  const validatePayload = validator.isValidPayload(payload, queryModel.dataCounting);
  const datacounting = async (result) => {
    return (result.err) ? result.message : await queryHandler.dataCounting(payload);
  };
  const sendResponse = (result) => {
    (result.code === 0) ? wrapper.handler(res, result) : wrapper.handlerError(res, result);
  };
  sendResponse(await datacounting(validatePayload));
};

module.exports = {
    insertFieldPrice,
    listStorage,
    dataCounting
  };