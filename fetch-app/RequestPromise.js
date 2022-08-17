const { get } = require('request-promise');

class RequestPromise {

async storages() {
    const options = {
      uri: `https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list`,
      headers: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
      }
    };
    try {
      let data = await get(options);
      return JSON.parse(data);
    }
    catch (error) {
      return JSON.parse([{}]);
    }
  }
}
 module.exports = RequestPromise