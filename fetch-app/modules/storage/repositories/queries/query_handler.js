const aggregator = require('./domain');

const listStorage = async (data) => {
  const liststorage = async () => {
    const domain = new aggregator;
    const result = await domain.listStorage(data);
    return result;
  };
  const response = await liststorage();
  return response;
};

const dataCounting = async (data) => {
  const datacounting = async () => {
    const domain = new aggregator;
    const result = await domain.dataCounting(data);
    return result;
  };
  const response = await datacounting();
  return response;
};

module.exports = {
  listStorage,
  dataCounting
};
