
function groupBy(param) {
return param.reduce((group,data) => {
   const { area_provinsi } = data;
   group[area_provinsi.replace(/ /g, '_')] = group[area_provinsi.replace(/ /g, '_')] ?? [];
   group[area_provinsi.replace(/ /g, '_')].push(data);
   return group;
 }, {})
}

function min(obj,param){
  return Math.min(...obj.map(item => item[param]))
}

function max(obj,param){
  return Math.max(...obj.map(item => item[param]));
 }
 
 function medianCounting(obj){
   let arr =[]
   obj.map(e=>{arr.push(e.price)});
   const mid = Math.floor(arr.length / 2),
   nums = [...arr].sort((a, b) => a - b);
   return arr.length % 2 !== 0 ? nums[mid] : (Number(nums[mid - 1]) + Number(nums[mid]))/ 2;
}

function average(obj){
   let arr =[]
   obj.map(e=>{arr.push(e.price)});
   let sum = 0;
   for( let i = 0; i < arr.length; i++ ){
    sum += parseInt( arr[i], 10 ); //don't forget to add the base
    return sum
}}

function arraySort(param){
 return param.sort((a, b) => a.tgl_parsed- b.tgl_parsed);
}

module.exports = {
   groupBy,
   min,
   max,
   medianCounting,
   average,
   arraySort
}