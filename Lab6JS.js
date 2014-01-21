// Global Variables
var puzzle;
var emptyPiece;
var piecesCollection;
var wonBox;

/**
*
* HELPER METHOD - ADDING EVENTS
* Supports World Wide Web Consortium W3C & Microsoft's earlier IE versions
*	
**/
function addEvent(obj, type, fn, cap){
	if (obj.attachEvent)
		obj.attachEvent("on" + type, fn);
	else
		obj.addEventListener(type,fn,cap);
}

/**
*
* HELPER METHOD - REMOVING EVENTS
* Supports World Wide Web Consortium W3C & Microsoft's earlier IE versions
*	
**/
function removeEvent(obj, type, fn, cap){
	if (obj.detachEvent)
		obj.detachEvent("on" + type, fn);
	else
		obj.removeEventListener(type,fn,cap);
}

/**
*
* HELPER METHOD - PRELOADING
* Supports World Wide Web Consortium W3C & Microsoft's earlier IE versions
*	
**/
function preload(imgs)
{
	var preloaded = new Image();
	for (var i = 0; i < preloaded.length; i++)
	{
		preloaded.src = imgs[i];
	}
}

/**
*
* Sets up the puzzle game for the user.
*	
**/
function init(){
	puzzle = document.getElementById("puzzlecanvas");

	// Preload all images
	preload("bmw.png");

	// Preapres the game board
	setBoard();
}

/**
*
* Sets up the puzzle game for the user.
*	
**/
function setBoard(){

// Keeps track of puzzle piece 
var counter = 0;

piecesCollection = [];

for(var i = 0; i < 4; i ++)
{
	for(var j = 0; j < 4; j++){

		if(document.getElementById(counter) != null)
			var piece = document.getElementById(counter);
		if (counter == 15){
			emptyPiece = piece;
			piecesCollection[counter] = emptyPiece;
		}
		else{
			piecesCollection[counter] = piece;
		}
		counter++;
		// Add puzzle piece to the array
		puzzle.appendChild(piece);
	}
}


// Randomizes the puzzle array
var randomizedArray = randomize(piecesCollection);

counter = 0;

for(var i = 0; i < 4; i ++)
{
	for(var j = 0; j < 4; j++)
	{
		var piece = randomizedArray[counter++];
		var top = 120 * i; //Height of a puzzle piece
		var left = 235 *j; // Length of a puzzle piece

		piece.style.top = top + "px";
		piece.style.left = left + "px";
		
	}
}

// Adds the click event to the puzzle and enables clicking of pieces
addEvent(puzzle, "click", choosePiece, false);
}

/**
*
* Randomizes the array of the puzzle pieces
*	
**/
function randomize(array){
	// Assign a random index array value using 2 place holder values (j and x) and the array length (i)
	for (var j, x, i = array.length ; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
		return array;
}

/**
*
* Sets up the puzzle game for the user.
*	
**/
function choosePiece(e){
	var evt = e || window.event;
	var obj = evt.target || evt.srcElement;
	if(isSlidable(obj))
	{
		movePieces(obj);

		if(isCompleted()){
			wonBox = document.getElementById("winMessage");
			removeEvent(puzzle, "click", clickPiece, false);
			wonBox.innerHTML = "Congratulations, you won! Claim your in-game prize here";
		}
	}
}

/**
*
* Checks if a selected puzzle piece is slidable or not.
*	
**/
function isSlidable(piece){
	var top = parseInt(piece.style.top, 10);
	var left = parseInt(piece.style.left, 10);
	var emptyTop = parseInt(emptyPiece.style.top, 10);
	var emptyLeft = parseInt(emptyPiece.style.left, 10);
	
	// Absolute values of distances
	var differenceTop = Math.abs(emptyTop - top);
	var differenceLeft = Math.abs(emptyLeft - left);

	// Checks if empty puzzle piece is found up/down or left/right
	if ((differenceTop === 0 && differenceLeft === 235) || (differenceTop === 120 && differenceLeft === 0))
		return true;

	return false;
}

/**
*
* Checks if puzzle pieces are in order, in other words check if puzzle is solved.
*	
**/
function isCompleted(){
	for(var i=0; i < piecesCollection.length - 1; i++){
		// If index equals to current position in the puzzle piece array
		if (piecesCollection[i].id != i)
			return false;
	}
	return true;
}

/**
*
* Moves the puzzle's piece by switching locations with the empty piece.
*	
**/
function movePieces(chosenPiece){
	var emptyTop = emptyPiece.style.top;
	var emptyLeft = emptyPiece.style.left;

	emptyPiece.style.top = chosenPiece.style.top;
	emptyPiece.style.left = chosenPiece.style.left;

	chosenPiece.style.top = emptyTop;
	chosenPiece.style.left = emptyLeft;

	var temp = piecesCollection.indexOf(chosenPiece);
	piecesCollection[piecesCollection.indexOf(emptyPiece)] = chosenPiece;
	piecesCollection[temp] = emptyPiece;
}

// Call init function on page load
window.onload = init;