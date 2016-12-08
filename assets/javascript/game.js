// GLOBAL VARIABLES (Accessible by all functions)
// ==================================================================================================
var you = "";
var enemy = "";

//OBJECT
//===================================================================================================

//Game character

function GameCharacter(healthPoints, attackPower, counterAttackPow, isYou, charName) {

	//properties
	this.healthPoints = healthPoints;
	this.attackPower = attackPower;
	this.counterAttackPow = counterAttackPow;
	this.isYou = isYou;
	this.charName = charName;
	this.baseAttackPower = this.attackPower;

	//methods
	this.updAttackPow = function (){
		if (this.isYou === true){
			this.attackPower = this.attackPower + this.baseAttackPower;
		}

	};

	this.updHealthPoints = function (attackPow){
		this.healthPoints = this.healthPoints - attackPow;
		return this.healthPoints;
		//$("p.healthpoints").html(this.healthPoints);
	};

	this.checkHealth = function (){
		if (this.healthPoints <= 0){
			console.log("Defeated");
			return true;
		}
		else{
			return false;
		}
	}

	//Testing/Debugging
	console.log("New character created: " + healthPoints + " " + attackPower + " " + counterAttackPow + " " + isYou + " ");
	

} //End of Object constructor


// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// ==================================================================================================


// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================

var namesarray = ["capAmerica","thor","hulk","ironMan","blackWidow"];
var hpArray = [150,180,200,130,120];

// array that stores defaults for game characters
var charDefArray = [
					{name: "capAmerica", healthP: 150, apower: 5, capower: 30},
					{name: "thor", healthP: 180, apower: 12, capower: 20},
					{name: "hulk", healthP: 200, apower: 15, capower: 25},
					{name: "ironMan", healthP: 130, apower: 14, capower: 15},
					{name: "blackWidow", healthP: 120, apower: 5, capower: 10}
];


//create an array of game character objects

var charArray = [
				new GameCharacter(150, 5, 30, false, "capAmerica"),
				new GameCharacter(180, 12, 20, false, "thor"),
				new GameCharacter(200, 15, 25, false, "hulk"),
				new GameCharacter(130, 14, 15, false, "ironMan"),
				new GameCharacter(120, 5, 10, false, "blackWidow")];

/*var capAmerica = new GameCharacter(150, 25, 30, true);
var thor = new GameCharacter(180, 40, 50, false);
var hulk = new GameCharacter(200, 50, 60, false);
var ironMan = new GameCharacter(130, 45, 40, false);
var blackWidow = new GameCharacter(120, 35, 55, false);*/


$("button").on("click", function(){

	console.log("Button clicked");

	if ($(this).hasClass("character")) {
		console.log("A character has been clicked!");
		console.log("character is: " + $(this).val());
		you = $(this).val();
		moveCharacters($(this).val());
	}
	else if($(this).hasClass("attack")){
		console.log("Attack button has been clicked");

		if ($("#defender").children().length === 0) {
			//div has no other tags inside it
			console.log("EMPTY");
			$("#message").html("No enemy chosen here.");
		}
		else{
			performAttack();
		}

	}

	console.log("I'm at end of on click");

});

$("#enemies").on("click", "button", function(){

	console.log("Button clicked");

	/*if ($(this).hasClass("character")) {
		console.log("A character has been clicked!");
		console.log("character is: " + $(this).val());
		moveCharacters($(this).val());
	}*/
	if($(this).hasClass("enemies")){
		console.log("An enemy has been clicked!");
		console.log("enemy is: " + $(this).val());
		enemy = $(this).val();
		moveCharToDef($(this).val());
		$(this).remove();
	}

	console.log("I'm at end of on click");

});

$("#message").on("click", "button", function(){

	console.log("Restart Button clicked");

	//clear all the divs and show characters div
	$("#characters").show();
	$("#yourchar").html("");
	$("#enemies").html("");
	$("#defender").html("");
	$("#message").html("");

	//reset the properties of gamecharacter

	for (var i = 0; i < charArray.length; i++) {
		//capAmerica.updAttackPow();
		charArray[i].healthPoints = charDefArray[i].healthP;
		charArray[i].attackPower = charDefArray[i].apower;
		//Testing/Debugging
		console.log(charArray[i]);
	}

});

function moveCharacters(charName){

	console.log("I'm here");

	//hide all characters from the character panel
	$("#characters").hide();

	//move character selected to your char panel
	var charButton = createCharButton(charName);
	/*var charButton = $("<button class='character'><img src = '' alt= 'character image'><p class = 'healthpoints'>Health points</p></button>"); 
	charButton.addClass("." + charName);*/
	charButton.addClass("yourChar");
	charButton.appendTo("#yourchar");
	

	//set chosen character isYou to true
	//if not chosen character create enemy buttons and move them to enemies div
	for (var i = 0; i < charArray.length; i++) {
		console.log("move char: " + charArray[i].charName);
		if (charArray[i].charName === charName) {
			charArray[i].isYou = true;
		}else{
			var enemiescharBut = createCharButton(charArray[i].charName);
			enemiescharBut.addClass("enemies");
			enemiescharBut.appendTo("#enemies");
		}
	}
	console.log("gonna display char array");
	displayCharArray();

	//move rest of characters to enemies section

}

function moveCharToDef(charName){
	//$("." + charName).hide();

	//move character selected to your Defender panel
	var charButton = createCharButton(charName);
	charButton.addClass("defender");
	charButton.appendTo("#defender");

}

function createCharButton(charName){
	//get healthpoints from hparray
	var n = namesarray.indexOf(charName);
	if(n > -1){
	var healthpnts = hpArray[n];
	}
	var charButton = $("<button><img src = '' alt=" + charName + "><p class = 'healthpoints'>" + healthpnts + "</p></button>"); 
	//$(".img").attr("alt", " image");
	charButton.addClass("." + charName);
	charButton.val(charName);
	return charButton;
}

function performAttack(){

	var youAttackpow = 0;
	var enemyAttackPow = 0;
	var isYouDefeated = false;
	var isEnemyDefeated = false;
	$("#message").html("");

	console.log("You: " + you);
	console.log("Enemy: " + enemy);
	for (var i = 0; i < charArray.length; i++) {
		//capAmerica.updAttackPow();
		if(charArray[i].charName === you){
			youAttackpow = charArray[i].attackPower;
		}
		else if(charArray[i].charName === enemy){
			enemyAttackPow = charArray[i].counterAttackPow;
		}

		//Testing/Debugging
		console.log(charArray[i] + " " + youAttackpow + " " +enemyAttackPow);
	}

	for (var i = 0; i < charArray.length; i++) {
		//capAmerica.updAttackPow();
		if(charArray[i].charName === you){
			var hp = charArray[i].updHealthPoints(enemyAttackPow);
			charArray[i].updAttackPow();
			$("button.yourChar > p.healthpoints").html(hp);
			isYouDefeated = charArray[i].checkHealth();

		}
		else if(charArray[i].charName === enemy){
			var hp = charArray[i].updHealthPoints(youAttackpow);
			$("button.defender > p.healthpoints").html(hp);
			isEnemyDefeated = charArray[i].checkHealth();
		}

		//Testing/Debugging
		console.log(charArray[i]);
	}
	console.log(isYouDefeated);
	console.log(isEnemyDefeated);


	//update the message div
	if(isEnemyDefeated === true){
		$("#message").append("<p> You have defeated " + enemy +",you can choose to fight another enemy.</p>");
		$("#defender").html("");

	}
	else if (isYouDefeated === true){
		$("#message").append("<p> You've been defeated...GAME OVER! </p>");
		$("#message").append("<button id='restart'> Restart </button>");
	}
	else{
		$("#message").append("<p> You attacked " + enemy + " for " + youAttackpow + " damage.</p>"); 
		$("#message").append("<p> enemy attacked you back for" + enemyAttackPow + " damage.</p>"); 
	}
	//$("#message").html("hello");


}

//Testing/Debugging

function displayCharArray(){

	for (var i = 0; i < charArray.length; i++) {
		//capAmerica.updAttackPow();

		//Testing/Debugging
		console.log(charArray[i]);
	}

}

$.each(charDefArray, function() {
	$.each(this, function(key,value) {

		console.log(key + ":" + value);
	});
});

/*for (var i = 0; i < 5; i++) {
	capAmerica.updAttackPow();

	//Testing/Debugging
	console.log("attack power: " + capAmerica.attackPower);
}*/
