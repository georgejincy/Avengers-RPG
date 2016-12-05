// GLOBAL VARIABLES (Accessible by all functions)
// ==================================================================================================


//OBJECT
//===================================================================================================

//Game character

function GameCharacter(healthPoints, attackPower, counterAttackPow) {
	this.healthPoints = healthPoints;
	this.attackPower = attackPower;
	this.counterAttackPow = counterAttackPow;
	

} //End of Object constructor


// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// ==================================================================================================


// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================

//create characters

var capAmerica = new GameCharacter(150, 25, 30);
var thor = new GameCharacter(180, 40, 50);
var hulk = new GameCharacter(200, 50, 60);
var ironMan = new GameCharacter(130, 45, 40);
var blackWidow = new GameCharacter(120, 35, 55);