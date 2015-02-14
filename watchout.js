// start slingin' some d3 here.
var gameOptions = {
	width : 750,
	height: 400,
	nEnemies: 10,
	padding: 20
};

var gameStats = {
	highScore: 0,
	currentScore: 0,
	collisions: 0
};

var generateEnemies = function(numEnemies){
	var container = [];

	for(var i = 0; i<=numEnemies; i++){
		var enemy = {
			id: i,
			width : 50,
			height : 50,
			shape : "circle",
			cx: Math.floor(Math.random() * gameOptions.width),
			cy: Math.floor(Math.random() * gameOptions.height),
			r: 15,
			color: "black"
		};
		container.push(enemy);
	}
	return container;
};

var enemies = generateEnemies(gameOptions.nEnemies);

var gameBoard = d3.select(".container")
.append("svg")
.attr("id", "gameBoard")
.attr("width", gameOptions.width)
.attr("height", gameOptions.height)
.attr("id", "gameBoard");

var circleGroup = gameBoard.append("g");
var circles = circleGroup.selectAll("circle").data(enemies).enter( ).append("circle");


var circleAttributes = circles.data(enemies).attr("cx", function(d){return d.cx;}).attr("cy", function(d){return d.cy;}).attr("r", function(d){return d.r;}).style("fill", function(d){return d.color;});

/*var generateXCoordinates = function(){
	return Math.floor(Math.random() * gameOptions.width);
};

var generateYCoordinates = function(){
	return Math.floor(Math.random() * gameOptions.height);
};*/







// d3.select(".container").append("suriken");
// update(enemies);
//Create game board
//Load enemies
//Start moving enemies
