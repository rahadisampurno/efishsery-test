const wrapper = require('../../../../helpers/utils/wrapper');
const common = require('../../../../helpers/utils/common');
const globalData = global

class transactionReportLogic {


  async listStorage() {
    let storage = globalData.storage
    try {
    storage = storage.filter(function(el) { return el.uuid != null }) 
    return wrapper.success(storage, storage.length, 'success');
    } catch (error) {
      return wrapper.fail([], 'Terjadi Kesalahan Pada System Kami', 500);
    } 
  }

  async dataCounting(data){
    let storage = globalData.storage;
    let result = [];
    try {
    storage =  storage.filter(function(el) { return el.uuid != null }) 
    storage = await common.groupBy(storage);
      for (const key in storage) {
        storage[key] = await common.arraySort(storage[key]);
        let hasil = {
          province : key,
          weekly : [] ,
        }
        let numb = 0;
        let weekly =0;
        let arrTemp =[];
        storage[key].map(e=>{
          numb +=1
          arrTemp.push(e)
          if (numb == 7){
            hasil.weekly.push({
            weekly : weekly +=1,
            min : common.min(arrTemp,'price'),
            max :common.max(arrTemp,'price'),
            median: common.medianCounting(arrTemp),
            average : common.average(arrTemp)
            })
            numb = 0;
            arrTemp =[]
          }
        })
        result.push(hasil)
      }
    if (data.province) {
       result.map(e=>{
        if (e.province == data.province) {
          result = e
        }
    })}
  return wrapper.success(result, result.length, 'success');
} catch (error) {
  return wrapper.fail([], 'Terjadi Kesalahan Pada System Kami', 500);
}
  
}
}


module.exports = transactionReportLogic;
