function territory (){
	this.units =
		[
			{
				"type":"Armor",
				"attack":3,
				"defend":3,
				"number":3
			},
			{
				"type":"Infantry",
				"attack":1,
				"defend":2,
				"number":6
			}
		];
}


var attackingTerritory = new territory();

var defendingTerritory = new territory();

$( document ).ready( function() {
	$("#startCombat").click( function() {
		runCombat( attackingTerritory, defendingTerritory );
	});
});

/*
 * This function runs a round of combat
*/
function runCombat( attackingTerritory, defendingTerritory ) {
	var myDie = 6;
	var attackHits = 0;
	var defendHits = 0;
	var Log = {};
	$.each( attackingTerritory.units, function(index, value) {
		for( var i = 0; i < attackingTerritory.units[index].number; i++ ) {
			myDie = getRandomInt( 1 , 6 );
			if( myDie <= attackingTerritory.units[index].attack ) {
				attackHits ++;
				Log["attacking-" + index + "-" + i] = { "roll" : myDie , "unit" : attackingTerritory.units[index].type , "result" : "Hit!" };
			}
			else {
				Log["attacking-" + index + "-" + i] = { "roll" : myDie , "unit" : attackingTerritory.units[index].type , "result" : "Miss!" };
			}
		}
	});
	alert( "Attacker has scored " + attackHits + " hits this round" );
	
	$.each( defendingTerritory.units, function( index, value ) {
		for( var i = 0; i < defendingTerritory.units[index].number; i++ ) {
			myDie = getRandomInt( 1 , 6 );
			if( myDie <= defendingTerritory.units[index].defend ) {
				defendHits++;
				Log["defending-" + index + "-" + i] = {"roll" : myDie , "unit" : defendingTerritory.units[index].type , "result" : "Hit!"};
			}
			else {
				Log["defending-" + index + "-" + i] = {"roll" : myDie , "unit" : defendingTerritory.units[index].type , "result" : "Miss!"};
			}
		}
	});
	alert( "Defender has scored " + defendHits + " hits this round" );
	console.log( Log );
	alert( "See console.log for detailed results");
	return { "attackHits" : attackHits , "defendHits" : defendHits};
}


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
