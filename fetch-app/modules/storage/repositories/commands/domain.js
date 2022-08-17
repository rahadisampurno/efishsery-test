
const wrapper = require('../../../../helpers/utils/wrapper')
const convertRupiah = require('rupiah-format')
let globalData = global;

class storage {
  async insertFieldPrice() {
   let result = []
   let storageDb = globalData.storage

   try {
    storageDb.map(e=>{
      e.idrPrice = convertRupiah.convert(e.price)
      result.push(e)
     })
    globalData.storage = result;
    return wrapper.success([], 0, 'success');
   } catch (error) {
    return wrapper.fail([], 'Terjadi Kesalahan Pada System Kami', 500);
   }

  }

}
module.exports = storage;
