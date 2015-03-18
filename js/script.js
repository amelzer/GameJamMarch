try{


//var player_figure = $('#player-figure');

var player = d3.select("#player-figure");

var spriteHeight = 100;
var spriteWidth = 50;

var speed = 5;

var playerPosition = null;
var enemyPosition = null;

var loadingCompleted = false;

var gameArea = d3.select('svg');

var maxEnemiesPerCircle = 6;

/* =======================================
 Game Area Specs
 =======================================*/
 var gameAreaDimensions = {
 	height:768,
 	width:1000
 };


/*========================================
	Level creation
=========================================*/

// how many enemies per circle?
// max number festlegen (je kleiner der circle desdo weniger kommen durch)

var enemyIdList = [];


var createEnemyCircle = function(cx,cy,radius,numberOfEnemies,duration){
	var pathstring = " M "+cx+", "+cy+" m -"+radius+", 0 a "+radius+","+radius+" 0 1,0 "+radius*2+",0 a "+radius+","+radius+" 0 1,0 -"+radius*2+",0";

	var pathId = "motionPath"+enemyIdList.length; 

	gameArea.append('path')
		.attr("d",pathstring)
		.attr("id",pathId);



	for(i=0;i<numberOfEnemies;i++){

 	var enemyImage = gameArea.append("svg:image") 	
      .attr("width", 50)
      .attr("height", 100)
      .attr("xlink:href", "img/couple_test.png")
	  .attr("id","enemy"+enemyIdList.length)
	  .attr("x","50")
	  .attr("y","50");

	enemyIdList.push("enemy"+enemyIdList.length);


	var enemyPath = enemyImage.append('animateMotion')
		.attr("begin",i+"s")
		.attr("dur",duration)
		.attr("repeatCount","indefinite")
		.attr("rotate","auto");

	enemyPath.append('svg:mpath')
		.attr("xlink:href","#"+pathId);

	}
}



/*========================================
	Prototype Level
========================================*/



//createEnemyCircle(500,400,250,6,"5s");
//createEnemyCircle(500,400,100,3,"3s");



/*========================================
	Keyboard interaction
========================================*/

var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;
var showLog = false;

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        	moveLeft = true;
        break;

        case 38: // up
        	moveUp = true;
        break;

        case 39: // right
        	moveRight = true;
        break;

        case 40: // down
        	moveDown = true;
        break;

        case 68: //debug
        	showLog =true;
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});


$(document).keyup(function(e) {
    switch(e.which) {
        case 37: // left
        	moveLeft = false;
        break;

        case 38: // up
        	moveUp = false;
        break;

        case 39: // right
        	moveRight = false;
        break;

        case 40: // down
        	moveDown = false;
        break;

        case 68: //debug
        	showLog = false;
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

/*========================================
	Movement
========================================*/

var moveItmoveIt = function(){
	var xPosition = parseInt(player.attr("x"));
	var yPosition = parseInt(player.attr("y"));
	if(moveUp && yPosition > speed){ player.attr("y",yPosition-speed)} ;
	if(moveDown && yPosition < gameAreaDimensions.height-speed-spriteWidth){ player.attr("y",yPosition+speed)};
	if(moveLeft && xPosition > speed){ player.attr("x",xPosition-speed)};
	if(moveRight && xPosition < gameAreaDimensions.width-speed-spriteWidth){ player.attr("x",xPosition+speed)};
}


/*==========================================
	Collision
===========================================*/

var isColliding = function(enemyId){
	//console.log("Collision mit "+enemyId);
  	playerPosition = document.getElementById('player-figure').getBoundingClientRect();    //BOUNDING BOX OF THE FIRST OBJECT
  	enemyPosition = document.getElementById(enemyId).getBoundingClientRect();

  return !(playerPosition.left > enemyPosition.right || 
           playerPosition.right < enemyPosition.left || 
           playerPosition.top > enemyPosition.bottom ||
           playerPosition.bottom < enemyPosition.top);
};

var checkCollision = function(enemyId){
	//console.log(valueOf(isColliding));
	if(isColliding(enemyId)){
		console.log("game over");
		$('svg').css("opacity",0);
		$('#outro-div').css("opacity",1);
		// reset player
		player.attr("x",10).attr("y",10);

	}
};

/*==========================================
	Winning
===========================================*/

var reachedExit = function(){

  	playerPosition = document.getElementById('player-figure').getBoundingClientRect();    //BOUNDING BOX OF THE FIRST OBJECT

  	if(playerPosition.left > 785 && playerPosition.left < 935 && playerPosition.top > 685 && playerPosition.top < 720){return true;}
  	return false;
};

var playerWon = function(){
	//console.log(valueOf(isColliding));
	if(reachedExit()){
		$('svg').css("opacity",0);
		//$('#outro-div-win').css("opacity",1);
		// reset player
		console.log("you won!");
		$("#outro-div-win").show();
		//player.attr("x",10).attr("y",10);

	}
};




/*========================================
	Logging
========================================*/
var showMeTheLog = function(){
	if(showLog){
		console.log(" Player Right "+playerPosition.right);
		console.log(" Player Left "+playerPosition.left);
		console.log("Player Top "+playerPosition.top);
		console.log("Player Bottom "+playerPosition.bottom);
	}
}




/*========================================
	Setup
========================================*/
setInterval("moveItmoveIt()",10);
setInterval("showMeTheLog()",10);
setInterval("playerWon()",10);


/*========================================
	Level Loading
========================================*/

// show welcome image
// time loading times
// hide wlcome image

setTimeout(function(){
	$("#intro-div-1").hide();
	//$("#intro-div-2").show();
	$('svg').css("opacity",1);
	enemyIdList.forEach(function(d){
		setInterval(function(){checkCollision(d);},10);
	});
	},maxEnemiesPerCircle*1000);

$("#intro-div-2").click(function(){
	console.log("click");

	 });


} catch (e) {
	console.log(e);
}