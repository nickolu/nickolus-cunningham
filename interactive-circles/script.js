/* 
Nick's Magic Ball Maker
Version: 1.0
Description: The real purpose of this is to demonstrate my knowledge of various JavaScript concepts. 
*/

// this is the object we use to create our balls,
// it serves as a model for all the balls we shall create
var Ball = function(color,height,width,maxLeft,maxTop,startTop,startLeft,changeInterval,id) {
	// ball properties:
	this.color = color;
	this.height = height;
	this.width = width;
	this.maxLeft = maxLeft;
	this.maxTop = maxTop;
	this.startTop = Math.random()*(0-this.maxTop)+this.maxTop; //used to be a fixed value but works better random
	this.startLeft = Math.random()*(0-90)+90; //used to be a fixed value but works better random
	this.changeInterval = changeInterval; //not used but set here in case I want to add a setInterval movement instead of on mouseover
	this.id = id;

	// ball methods: 
	this.moveLeft = function () {
		document.getElementById(this.id).style.left = Math.random()*(0-90)+90+"%";
	}
	this.moveTop = function () {
		document.getElementById(this.id).style.top = Math.random()*(0-this.maxTop)+this.maxTop+"px";
	}
}

// change these values to set different default properties
var defaults = {
	color: "red",
	height: 100,
	width: 100,
	maxTop: 400,
	startTop: 75, 
	startLeft: 10, 
	changeInterval: 10 
}

// here we create a function which allows us to call the movement methods in a for loop
function moveBalls(i) {
	newBalls[i].moveTop();
	newBalls[i].moveLeft();
}

var createdBalls =[]; // this is important to make sure there are no duplicates

// this is the main function which creates the ball object and related DOM elements
function createBalls(newBalls) {
	for (var i=0; i<newBalls.length; i++) {

		createdBalls.push(newBalls[i]); // push each created ball to that array
		var numBalls = createdBalls.length; // and make a variable with the array length
		
		//here is the actual object constructor:
		newBalls[i] = new Ball (
			newBalls[i],
			defaults.height,
			defaults.width,
			defaults.maxLeft,
			defaults.maxTop,
			defaults.startTop,
			defaults.startLeft,
			defaults.changeInterval,
			"ball"+numBalls // remember that createdBalls array? this is how it prevents duplicate IDs
		);
		
		//this is the part that creates the DOM elements from the object properties
		var div = document.createElement("div");
		div.style.backgroundColor = newBalls[i].color;
		div.style.height = newBalls[i].height+"px";
		div.style.width = newBalls[i].width+"px";
		div.style.top = newBalls[i].startTop+"px";
		div.style.left = newBalls[i].startLeft+"%";
		div.id = newBalls[i].id;
		div.className = "ball";
		document.body.appendChild(div); // append the new element to body (might want to make a specific container for this later)

		// here's the real magic - gives the element the mousover eventlistener to invoke the movement methods
		(function(i){
			div.addEventListener("mouseover",function(){
				newBalls[i].moveTop();
				newBalls[i].moveLeft();
			});
		}(i)) // notice we use an IIFE to pass the iteration number into the method
	}
} // end createBalls function

function clearBalls() {
	location.reload(); // should make this something more fancy later, but hey this works for now
}

// this array sets the balls created at start if enabled
var newBalls = [
	"red",
	"blue",
	"green",
	"grey"
];

// we have to invoke the createBalls function after the window loads,
// otherwise they won't be added to the DOM in the right order and the elements won't
// exist at the time we add the eventlisteners. pretty tricky!
window.onload = function() {
	//createBalls(newBalls); //uncomment this to start with some balls by default

	// this makes the alert appear the first time a ball is created
	function mouseOverAlert() {
		var h3 = document.getElementById('mouseOverAlert');
		h3.style.opacity = 1;
		console.log(h3.id);

		// the alert goes away after 2 seconds
		setTimeout(function(){
			h3.style.opacity = 0;
		}, 2000);
	}

	// this is the event that creates a ball when the create button is clicked 
	// its real job is to invoke the object constructor with the properties set
	// by the dropdown menu
	function createEvent() {
		// here we get the selected options from the dropdown menu
		var colors = document.getElementById("colors"); // dropdown menu
		var selectedColor = colors.options[colors.selectedIndex].value; // selected item
		
		newBalls = [] // make sure this array is empty
		newBalls.push(selectedColor); // so we can fill it with our new elements
		createBalls(newBalls); // and then invoke the big function

		if (createdBalls.length < 2) {
			mouseOverAlert(); // here's that fancy alert
		}
	}
	
	// and finally we make it all actually happen
	document.getElementById("button").addEventListener("click",function(){
		createEvent();
	});

	// and a reset button for the user's comfort
	document.getElementById("clear").addEventListener("click",function(){
		clearBalls();
	});
}



