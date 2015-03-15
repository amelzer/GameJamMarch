try{

console.log("Test");

//var player_figure = $('#player-figure');

var player = d3.select("#player-figure");
var enemy =  d3.select("#enemy-1");

var playerPosition = null;
var enemyPosition = null;

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
	if(moveUp){ player.attr("y",yPosition-1)} ;
	if(moveDown){ player.attr("y",yPosition+1)};
	if(moveLeft){ player.attr("x",xPosition-1)};
	if(moveRight){ player.attr("x",xPosition+1)};
}

/*==========================================
	Collision
===========================================*/

var isColliding = function(){
  	playerPosition = document.getElementById('player-figure').getBoundingClientRect();    //BOUNDING BOX OF THE FIRST OBJECT
    enemyPosition = document.getElementById('enemy-1').getBoundingClientRect();
    //console.log(playerPosition);

  return !(playerPosition.left > enemyPosition.right || 
           playerPosition.right < enemyPosition.left || 
           playerPosition.top > enemyPosition.bottom ||
           playerPosition.bottom < enemyPosition.top);
};

var checkCollision = function(){
	//console.log(valueOf(isColliding));
	if(isColliding()){
		console.log("game over");
	}
};

/*========================================
	Logging
========================================*/
var showMeTheLog = function(){
	if(showLog){
		console.log("Enemy Left "+enemyPosition.left+" Player Right "+playerPosition.right);
		console.log("Enemy Right "+enemyPosition.right+" Player Left "+playerPosition.left);
		console.log("Player Top "+playerPosition.top+" Enemy Bottom "+enemyPosition.bottom);
		console.log("Player Bottom "+playerPosition.bottom+" Enemy Top "+enemyPosition.top);
	}
}

/*========================================
	Setup
========================================*/
setInterval("moveItmoveIt()",10);
setInterval("isColliding()",10);
setInterval("checkCollision()",10);
setInterval("showMeTheLog()",10);

} catch (e) {
	console.log(e);
}