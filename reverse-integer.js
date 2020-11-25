/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  if(x===0){return 0}
  const result = parseInt((x+"").split("").reverse().join("").replace(/^0+/g, ""),10)
  if(Number.isNaN(result)){return 0}
  if(result>2**31){return 0}
  return x>0?result:-1*result
};

console.log(reverse(12))
console.log(reverse(1534236469))
console.log(reverse(1563847412))
