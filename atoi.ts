const MAX_INT = 2**31 - 1
const MIN_INT = (2**31) * -1
function myAtoi(s: string): number {
  let cleaned = ""
  const reg = /\d/g
  for(const char of s){
    if(char.match(reg)){
      cleaned += char
    }
    else{
      if(cleaned){break}
      else if(char==="+"||char ==="-"){
        cleaned += char
        continue
      }
      else if(char===" "){
        continue
      }
      else{
        break
      }
    }
  }
  const n = parseInt(cleaned,10)
  if(Number.isNaN(n)){return 0}
  if(n < MIN_INT){return MIN_INT}
  if(n > MAX_INT){return MAX_INT}
  return n
}


console.log(myAtoi("00000-42a1234"))
console.log(myAtoi("words and 987"))
console.log(myAtoi("+-12"))
console.log(myAtoi("+12"))
console.log(myAtoi("-12"))
