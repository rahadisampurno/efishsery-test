const { allow, number } = require('joi');
const joi = require('joi');

const listStorage = joi.object({
});

const dataCounting = joi.object({
  province:joi.string().optional().allow(''),
});

module.exports = {
  listStorage,
  dataCounting
};
