require('dotenv').config();
const confidence = require('confidence');
const config = {
  port: process.env.PORT,
  secretKey:  process.env.SECRETKEY,
  database:  process.env.DATABASE,
};

const store = new confidence.Store(config);
exports.get = key => store.get(key);
