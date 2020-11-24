/*

*/
const refCellInBox = {
	"0" :"a", "1":"a", "2":"a",  "3":"b", "4":"b", "5":"b",  "6":"c", "7":"c", "8":"c",
	"9" :"a","10":"a","11":"a", "12":"b","13":"b","14":"b", "15":"c","16":"c","17":"c",
	"18":"a","19":"a","20":"a", "21":"b","22":"b","23":"b", "24":"c","25":"c","26":"c",

	"27":"d","28":"d","29":"d", "30":"e","31":"e","32":"e", "33":"f","34":"f","35":"f",
	"36":"d","37":"d","38":"d", "39":"e","40":"e","41":"e", "42":"f","43":"f","44":"f",
	"45":"d","46":"d","47":"d", "48":"e","49":"e","50":"e", "51":"f","52":"f","53":"f",
	
	"54":"g","55":"g","56":"g", "57":"h","58":"h","59":"h", "60":"i","61":"i","62":"i",
	"63":"g","64":"g","65":"g", "66":"h","67":"h","68":"h", "69":"i","70":"i","71":"i",
	"72":"g","73":"g","74":"g", "75":"h","76":"h","77":"h", "78":"i","79":"i","80":"i",
}
const boxes = {
  "a" : [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]],
  "b" : [[3,0],[3,1],[3,2],[4,0],[4,1],[4,2],[5,0],[5,1],[5,2]],
  "c" : [[6,0],[6,1],[6,2],[7,0],[7,1],[7,2],[8,0],[8,1],[8,2]],
  "d" : [[0,3],[0,4],[0,5],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5]],
  "e" : [[3,3],[3,4],[3,5],[4,3],[4,4],[4,5],[5,3],[5,4],[5,5]],
  "f" : [[6,3],[6,4],[6,5],[7,3],[7,4],[7,5],[8,3],[8,4],[8,5]],
  "g" : [[0,6],[0,7],[0,8],[1,6],[1,7],[1,8],[2,6],[2,7],[2,8]],
  "h" : [[3,6],[3,7],[3,8],[4,6],[4,7],[4,8],[5,6],[5,7],[5,8]],
  "i" : [[6,6],[6,7],[6,8],[7,6],[7,7],[7,8],[8,6],[8,7],[8,8]],
}
const boxOfCell = (x,y) => boxes[refCellInBox[(y*9+x)+""]].filter(box=>box[0]!==x || box[1]!==y)
const columnOfCell = (x,y) => {
	const c = []
	for(let i=0;i<9;i++){
		if(i===y){continue}
		c.push([x,i])
	}
	return c
}
const rowOfCell = (x,y) => {
	const r = []
	for(let i=0;i<9;i++){
		if(i===x){continue}
		r.push([i,y])
	}
	return r
}
const getRawPossibles = ()=>{
	const possibles = []
	for(let i=0;i<9;i++){
		possibles.push([])
		for(let j=0;j<9;j++){
			possibles[i].push({
				"1" : true,
				"2" : true,
				"3" : true,
				"4" : true,
				"5" : true,
				"6" : true,
				"7" : true,
				"8" : true,
				"9" : true,
			})
		}
    }
    return possibles
}
const getPossibleValues = possible => Object.keys(possible).filter(x=>possible[x])
const distributors = [boxOfCell,columnOfCell,rowOfCell]
const consider = (board, possibles, x, y, value) => {
	board[x][y] = value
	for(const distributor of distributors){
		for(const [dx,dy] of distributor(x,y)){
			possibles[dx][dy][value+""] = false
			const remaining = getPossibleValues(possibles[dx][dy])
			if(remaining.length === 1 && board[dx][dy]==="."){
				// checking if not conflicting (means we guessed wrong prior)
				for(const distributor of distributors){
					for(const [ddx,ddy] of distributor(dx,dy)){
						if(remaining[0] === board[ddx][ddy]){
							return false
						}
					}
				}
				board[dx][dy] = remaining[0]
				const result = consider(board, possibles, dx, dy, remaining[0])
				if(!result){return false}
			}
		}
	}
	for(let x=0;x<9;x++){
		for(let y=0;y<9;y++){
			if(board[x][y]!=="."){continue}
			for(const v of getPossibleValues(possibles[x][y])){
				let solePossible = true
				for(const distributor of distributors){
					for(const [dx,dy] of distributor(x,y)){
						if(possibles[dx][dy][v]){
							solePossible = false
							break
						}
					}
					if(!solePossible){break}
				}
				if(solePossible){
					consider(board, possibles, x, y, v)
				}
			}
		}
	}
	return true
}
const isFinished = board => {
	for(let x=0;x<9;x++){
		for(let y=0;y<9;y++){
			if(board[x][y]==="."){
				return false
			}
		}
	}
	return true
}
/**
 * @return null|character[][] valid board found
 */
const solve = (board, possibles, n=0) => {
	//console.log("solving")
	if(n>=3){return null}
	const options = []
	for(let x=0;x<9;x++){
		for(let y=0;y<9;y++){
			if(board[x][y]!=="."){continue}
			options.push([x,y,getPossibleValues(possibles[x][y])])
		}
	}
	options.sort((a,b)=>a[2].length>b[2].length?-1:1)
	//console.log(options.length, "options")
	for(const [x,y,values] of options){
		for(const v of values){
			const boardCopy     = JSON.parse(JSON.stringify(board))
			const possiblesCopy = JSON.parse(JSON.stringify(possibles))
			if(!consider(boardCopy, possiblesCopy, x, y, v)){
				// brings us to an invalid state, moving on to next options
				continue
			}
			if(isFinished(boardCopy)){
				return boardCopy
			}
			// if we made it here, we're not finished, but we did not encounter anything invalid, we recurse down
			const result = solve(boardCopy, possiblesCopy, n+1)
			if(result){return result}
		}
	}
	return null
}
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
	const possibles = getRawPossibles()
	// inputing data into the possibles
	for(let x=0;x<9;x++){
		for(let y=0;y<9;y++){
			const cell = board[x][y]
			if(cell === "."){continue}
			consider(board, possibles, x, y, cell)
		}
	}
	if(isFinished(board)){return}
	const solution = solve(board, possibles)
	for(let x=0;x<9;x++){
		for(let y=0;y<9;y++){
			board[x][y] = solution[x][y]
		}
	}
};

const board = [
	["5","3",".",".","7",".",".",".","."],
	["6",".",".","1","9","5",".",".","."],
	[".","9","8",".",".",".",".","6","."],
	["8",".",".",".","6",".",".",".","3"],
	["4",".",".","8",".","3",".",".","1"],
	["7",".",".",".","2",".",".",".","6"],
	[".","6",".",".",".",".","2","8","."],
	[".",".",".","4","1","9",".",".","5"],
	[".",".",".",".","8",".",".","7","9"],
]
const board2 = [
	[".",".","9","7","4","8",".",".","."],
	["7",".",".",".",".",".",".",".","."],
	[".","2",".","1",".","9",".",".","."],
	[".",".","7",".",".",".","2","4","."],
	[".","6","4",".","1",".","5","9","."],
	[".","9","8",".",".",".","3",".","."],
	[".",".",".","8",".","3",".","2","."],
	[".",".",".",".",".",".",".",".","6"],
	[".",".",".","2","7","5","9",".","."]
]
const board3 = [
	[".",".",".",".",".","7",".",".","9"],
	[".","4",".",".","8","1","2",".","."],
	[".",".",".","9",".",".",".","1","."],
	[".",".","5","3",".",".",".","7","2"],
	["2","9","3",".",".",".",".","5","."],
	[".",".",".",".",".","5","3",".","."],
	["8",".",".",".","2","3",".",".","."],
	["7",".",".",".","5",".",".","4","."],
	["5","3","1",".","7",".",".",".","."],
]
//console.table(board3)
solveSudoku(board3)
//console.table(board3)
