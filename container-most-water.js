/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
	let x1 = 0
	let x2 = height.length-1
	let maxArea = 0
	while(x1<x2){
		const h1 = height[x1]
		const h2 = height[x2]
		const area = Math.min(h1, h2) * (x2-x1)
		if(area > maxArea){maxArea = area}
		h1<h2 ? x1++ : x2--
	}
	return maxArea
}

console.log(maxArea([1,1]))
console.log(maxArea([4,3,2,1,4]))
console.log(maxArea([1,2,1]))
