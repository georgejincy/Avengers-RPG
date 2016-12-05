// GLOBAL VARIABLES (Accessible by all functions)
// ==================================================================================================


//OBJECT
//===================================================================================================

//Game character

function GameCharacter(healthPoints, attackPower, counterAttackPow, isYou) {

	//properties
	this.healthPoints = healthPoints;
	this.attackPower = attackPower;
	this.counterAttackPow = counterAttackPow;
	this.isYou = isYou;
	this.baseAttackPower = this.attackPower;

	//methods
	this.updAttackPow = function (){
		if (this.isYou === true){
			this.attackPower = this.attackPower + this.baseAttackPower;
		}

	};

	this.updHealthPoints = function (attackPow){
		this.healthPoints = this.healthPoints - attackPow;
	};

	this.checkHealth = function (){
		if (this.healthPoints <= 0){
			console.log("Defeated");
		}
	}

	//Testing/Debugging
	console.log("New character created: " + healthPoints + " " + attackPower + " " + counterAttackPow + " " + isYou + " ");
	

} //End of Object constructor


// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// ==================================================================================================


// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================

//create characters

var capAmerica = new GameCharacter(150, 25, 30, true);
var thor = new GameCharacter(180, 40, 50, false);
var hulk = new GameCharacter(200, 50, 60, false);
var ironMan = new GameCharacter(130, 45, 40, false);
var blackWidow = new GameCharacter(120, 35, 55, false);

for (var i = 0; i < 5; i++) {
	capAmerica.updAttackPow();

	//Testing/Debugging
	console.log("attack power: " + capAmerica.attackPower);
}
