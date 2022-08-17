
const domain = require('./domain');

const insertFieldPrice = async (data) => {
  const insertfieldprice = async () => {
    const d = new domain;
    const result = await d.insertFieldPrice(data);
    return result;
  };
  const response = await insertfieldprice();
  return response;
};

module.exports = {
  insertFieldPrice
};
