// document.getElementById("scoreKeeper").innerHTML = "swerve";


// Create variable section
//add canvas to the document
var canvas = document.createElement("canvas"); 
//context for Javascript to play with
var context = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;

// Add canvas to the body of the document
document.body.appendChild(canvas);

var backgroundImage = new Image(); 
backgroundImage.src = "Images/background.png";

// Create robinhood along with his coordinates
var robinHood = new Image(); 

robinHood.src = "Images/robin-hood.png";
var robinHoodLocation = {
	x: 200,
	y: 200
}

//create a goblin along with its coordinates
var goblin = new Image(); 
goblin.src = "Images/goblin.png"; 
var goblinLocation = {
	x: 300, 
	y: 200,
	destinationX: 400, 
	destinationY: 400
}


function update(){
	moveRobinHood();
	moveGoblin();

}
//MOVING SECTION 
var speedModifier = 1;
var keysPressed = []; //array that holds whats in the array

addEventListener("keyup", function(event){
	delete keysPressed[event.keyCode];
})
//anonymous functions to pass moveRobinhood commands 
addEventListener("keydown", function(event){
	keysPressed[event.keyCode] = true; //this position of the array has a position of true
})

//happens when the user releases teh keys

//this should be in the update function -
function moveRobinHood(){
	// the entire if statement logic should go here which will be accessed by the update function
	if(37 in keysPressed){
		if (robinHoodLocation.x >= 32){
			robinHoodLocation.x -= 7 * speedModifier;
		}
	}
	if (38 in keysPressed){
		if (robinHoodLocation.y >= 30){
			robinHoodLocation.y -= 7 * speedModifier;
		}
	}
	if (39 in keysPressed){
		if (robinHoodLocation.x <= 440){
			robinHoodLocation.x += 7 * speedModifier;
		}
	}
	if (40 in keysPressed){
		if (robinHoodLocation.y <= 405){
			robinHoodLocation.y += 7 * speedModifier;
		}
	}
}

//create goblin destinations 


function moveGoblin(){
	//if he is already at his destination, generate a random one, otherwise move to destination
	if(
		(Math.abs(goblinLocation.x - goblinLocation.destinationX)) < 32 
		&& Math.abs(goblinLocation.y - goblinLocation.destinationY) < 32
	){
		goblinLocation.destinationX = Math.random() * 650; 
		goblinLocation.destinationY = Math.random() * 650; 
		// show me the new destination when teh goblin reaches the one it's trying to get to
		console.log(goblinLocation.x, goblinLocation.y)
		console.log(goblinLocation.destinationX, goblinLocation.destinationY);
		
	}else if(goblinLocation.x < goblinLocation.destinationX){
		goblinLocation.x += 4; 
	}else if(goblinLocation.x > goblinLocation.destinationX){
		goblinLocation.x -= 4; 
	}else if(goblinLocation.y > goblinLocation.destinationY){
		goblinLocation.y -= 4; 
	}else if(goblinLocation.y < goblinLocation.destinationY){
		goblinLocation.y +=4;
	}//start here and check to see if goblin is moving properly
	console.log(goblinLocation.x, goblinLocation.destinationX);
	
};


//need to draw the image constantly

function draw() {
	update();
	context.drawImage(backgroundImage, 0, 0);
	context.drawImage(robinHood, robinHoodLocation.x, robinHoodLocation.y);
	context.drawImage(goblin, goblinLocation.x, goblinLocation.y);
	requestAnimationFrame(draw);
};

draw();