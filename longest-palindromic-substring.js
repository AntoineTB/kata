/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if(s.length<2){return s}
  if(s.length===2){return s[0]===s[1] ? s : s[0]}
  let bestLeft = 0
  let bestRight = 0
  for(let i=0;i<s.length;i++){
    let fullIndexLen = expand(s, i, i)
    let halfIndexLen = expand(s, i, i+1)
    let len = Math.max(halfIndexLen, fullIndexLen)
    if(len > bestRight - bestLeft){
      bestLeft  = Math.round(i - (len-1)/2)
      if(bestLeft<0){bestLeft=0}
      bestRight = Math.floor(i + len/2)
    }
  }
  return s.substr(bestLeft, bestRight-bestLeft+1)
};

const expand = function(s, l, r){
  while(l>=0 && r<s.length && s[l] === s[r]){r++;l--}
  return r-l-1
}


console.info(longestPalindrome("babad"))
console.info(longestPalindrome("cbbd"))
console.info(longestPalindrome("a"))
console.info(longestPalindrome("ac"))
console.info(longestPalindrome("bb"))
console.info(longestPalindrome("aaaa"))
console.info(longestPalindrome("caaaad"))
console.info(longestPalindrome("c12321d"))
console.info(longestPalindrome("caaaa"))
console.info(longestPalindrome("caaaacc"))
