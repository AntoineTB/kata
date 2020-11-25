/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
	if(s.length<2){return s.length}
    let start = 0
	let best = 0
    while(start<s.length-best){
    	let run = 0
	    let seen = new Map()
	    let i = start
	    while (i < s.length){
	    	const char = s[i]
	    	if(!seen.has(char)){
	    		seen.set(char, i)
	    		run += 1
	    		i++
	    	}
	    	else{
	    		start = seen.get(char)+1
	    		if(run > best){best = run}
	    		break
	    	}
	    }
	    if(run > best){best = run}
    }
    return best
};
console.log(lengthOfLongestSubstring("abcabcbb"))
console.log(lengthOfLongestSubstring("bbbbbbbbb"))
console.log(lengthOfLongestSubstring("pwwkew"))
console.log(lengthOfLongestSubstring(""))
console.log(lengthOfLongestSubstring(" "))