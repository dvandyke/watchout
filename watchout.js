// start slingin' some d3 here.
var pixelize = function(input){
	return input + "px";
};

var gameOptions = {
	width : 750,
	height: 500,
	nEnemies: 20,
	padding: 20,
	w: window.innerWidth,
	h: window.innerHeight,
	r: 10,
	duration: 1500
};

var rand  = function(n){ return Math.floor( Math.random() * n ); };
var randX = function(){ return pixelize( rand(gameOptions.w-gameOptions.r*2) ) };
var randY = function(){ return pixelize( rand(gameOptions.h-gameOptions.r*2) ) };

var updateScore = function(){
	d3.select(".high").text(score);
	d3.select(".current").text(highScore);
	d3.select(".collisions").text(collisionCount)
};

var mouse  = {
	x: gameOptions.w/2,
	y: gameOptions.h/2
};

var score = 0;
var highScore = 0;
var collisionCount = 0;

var gameStats = {
	highScore: 0,
	currentScore: 0,
	collisions: 0
};

/*var generateEnemies = function(numEnemies){
	var container = [];

	for(var i = 0; i<=numEnemies; i++){
		var enemy = {
			id: i,
			width : 50,
			height : 50,
			shape : "circle",
			cx: Math.floor(Math.random() * gameOptions.width),
			cy: Math.floor(Math.random() * gameOptions.height),
			r: 10,
			color: "black"
		};
		container.push(enemy);
	}
	return container;
};*/

// var enemies = generateEnemies(gameOptions.nEnemies);

var player = {
	id: "player",
	width: 50,
	height: 50,
	shape: "circle",
	r: 10,
	color: "blue",
	draggable: "draggable",
	path: "m-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z",
	cx: gameOptions.width/2,
	cy: gameOptions.height/2
};


var gameBoard = d3.select(".board").style({
	width: pixelize(gameOptions.w),
	height: pixelize(gameOptions.h)
});

d3.select(".mouse").style({
	top: pixelize(mouse.y),
	left: pixelize(mouse.x),
	width: pixelize(player.r*2),
	height: pixelize(player.r*2),
	"border-radius": pixelize(player.r)
});

gameBoard.on("mousemove", function(){
	var loc = d3.mouse(this);
	mouse = { x: loc[0], y: loc[1] };
	d3.select(".mouse").style({
		top:pixelize(mouse.y - gameOptions.r),
		left: pixelize(mouse.x - gameOptions.r)
	});
});

var asteroids = gameBoard.selectAll(".asteroids")
.data(d3.range(gameOptions.nEnemies))
.enter().append("div")
.attr("class", "asteroid")
.style({
	top: randY,
	left: randX,
	width: pixelize(gameOptions.r*2),
	height: pixelize(gameOptions.r*2)
});

var move = function(element){
	element.transition().duration(gameOptions.duration).ease('cubic-in-out').style({
		top: randY,
		left: randX
	}).each('end', function(){
		move(d3.select(this));
	});
};
move(asteroids);

var scoreTicker = function(){
	score = score+1;
	highScore = Math.max(score, highScore);
	updateScore();
};
setInterval(scoreTicker, 100);

var prevCollision = false;

var detectCollisions = function(){
	var collision = false;
	asteroids.each(function(){
		var cx = this.offsetLeft + gameOptions.r;
		var cy = this.offsetTop + gameOptions.r;

		var x = cx -mouse.x;
		var y = cy - mouse.y;
		if(Math.sqrt(x*x +  y*y) < gameOptions.r*2){
			collision = true;
		}
	});

	if(collision){
		score = 0;
		if(prevCollision != collision){
			collisionCount = collisionCount + 1;
		}
	} 
	prevCollision = collision;
};

d3.timer(detectCollisions);
