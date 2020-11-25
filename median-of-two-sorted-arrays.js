/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  if(!nums1.length && !nums2.length){return 0.0}
  else if(!nums1.length){
    // we can dig directly into nums 2
  }
  else if(!nums2.length){
    // we can dig directly into nums 1
  }
  else if(nums1[nums1.length-1] < nums2[0]){
  // we can dig directly into nums1 or num2 depending on which is the biggest, with some rule or three, it's basically O(1) here
  }
  else{
    /* 
      arrays elements mix together, more complex case is this one
      intuition tells me we can do two binary search at the same time, 
      our big question is : how much overlap do those two arrays have
      if we can answer that, we can find our median easily, I think
      althrough, worst case scenario is if our arrays have the same content
    */
    // hum, not sure I understand the solution at all, seems to do a single binary search
    // https://leetcode.com/problems/median-of-two-sorted-arrays/solution/
  }
};

