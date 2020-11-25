/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
class CListNode{
	constructor(val, next) {
	    this.val = (val===undefined ? 0 : val)
	    this.next = (next===undefined ? null : next)
	}
}
function ListNode(val, next){
	return new CListNode(val, next)
}
var add = function(l1, l2, node, carry) {
	if(l1 === null && l2 === null){
		if(carry){
			node.next = ListNode(1)
		}
	}
	else{
		const v = (l1?l1.val:0) + (l2?l2.val:0) + carry
		node.next = add(l1?l1.next:null, l2?l2.next:null, ListNode(v%10), v>=10?1:0)
	}
	return node
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
	const v = l1.val + l2.val
    return add(l1.next, l2.next, ListNode(v%10), v>=10?1:0)
};

const translate = (listNode)=>{
	const accumulator = [listNode.val]
	while(listNode = listNode.next){
		accumulator.push(listNode.val)
	}
	return accumulator
}

console.table(translate(addTwoNumbers(
	ListNode(2,ListNode(4,ListNode(3))),
	ListNode(5,ListNode(6,ListNode(4))),
)))
console.table(translate(addTwoNumbers(
	ListNode(9,ListNode(9,ListNode(9,ListNode(9,ListNode(9,ListNode(9,ListNode(9))))))),
	ListNode(9,ListNode(9,ListNode(9,ListNode(9)))),
)))


/*
[9,4,3]
[5,6,4]
is
[7,0,8]

[0]
[0]
is
[0]

[9,9,9,9,9,9,9]
[9,9,9,9]
is
[8,9,9,9,0,0,0,1]
*/