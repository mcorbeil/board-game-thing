/*
Army class
This should have all units defined eventually, currently keeping the base small
 */
function Army( Units ){
	this.units =
	{
		"Armor"	:
		{
			"type"		:	"Armor"		,
			"attack" 	:	3			,
			"defend"	:	3			,
			"number"	: 	0
		},
		"Mans"	:
		{
			"type"		:	"Mans"		,
			"attack"	:	1			,
			"defend"	:	2			,
			"number"	:	0
		},
		"MansPaired"	:
		{
			"type"		:	"Mans"		,
			"attack"	:	2			,
			"defend"	:	2			,
			"number"	:	0
		},
		"Trucks"	:
		{
			"type"		:	"Mans"		,
			"attack"	:	1			,
			"defend"	:	2			,
			"number"	:	0
		},
		"TrucksPaired"	:
		{
			"type"		:	"Mans"		,
			"attack"	:	2			,
			"defend"	:	2			,
			"number"	:	0
		},
		"Artillery"	:
			{
				"type"		:	"Artillery"	,
				"attack"	:	2			,
				"defend"	:	2			,
				"number"	:	0
			}
	};

	for( var i = 0 ; i < Units.length; i++ ) {
		this.units[ Units[i]["type"] ].number = [Units[i]["number"]];
	}

	// After we have set up a list of units in the army, lets search for artillery pairings
	// I am aware this may not be as efficient as an if-else block, but this is the cleanest to write
	for( var j = 0; j < this.units.Artillery.number; j++) {
		if( this.units.Trucks.number > 0 ) {
			this.units.Trucks.number --;
			this.units.TrucksPaired.number ++;
		}
		else if( this.units.Mans.number > 0 ) {
			this.units.Mans.number --;
			this.units.MansPaired.number ++;
		}
		else {
			// If we have no more Mans or Trucks to pair, break out of this loop!
			break;
		}
	}
}


var attackingArmy =
	new Army(
		[
			{
				"type"	: "Armor",
				"number": 19
			}
		]);

var defendingArmy =
	new Army(
		[
			{
				"type"	:	"Mans",
				"number":	22
			}
		]
	);

$( document ).ready( function() {
	$("#startCombat").click( function() {
		runCombat( attackingArmy, defendingArmy );
	});
});

/*
 * This function runs a round of combat
*/
function runCombat( attackingArmy, defendingArmy ) {
	var myDie = 6;
	var attackHits = 0;
	var defendHits = 0;
	$.each( attackingArmy.units, function(index, value) {
		for( var i = 0; i < attackingArmy.units[index].number; i++ ) {
			myDie = getRandomInt( 1 , 6 );
			if( myDie <= attackingArmy.units[index].attack ) {
				attackHits ++;
				logCombat( "Attacking" , attackingArmy.units[index].type , myDie , "Hit!" )
			}
			else {
				logCombat( "Attacking" , attackingArmy.units[index].type , myDie , "Missed!" )
			}
		}
	});
	alert( "Attacker has scored " + attackHits + " hits this round" );
	
	$.each( defendingArmy.units, function( index, value ) {
		for( var i = 0; i < defendingArmy.units[index].number; i++ ) {
			myDie = getRandomInt( 1 , 6 );
			if( myDie <= defendingArmy.units[index].defend ) {
				defendHits++;
				logCombat( "Defending" , defendingArmy.units[index].type , myDie , "Hit!" )
			}
			else {
				logCombat( "Defending" , defendingArmy.units[index].type , myDie , "Missed!" )
			}
		}
	});
	alert( "Defender has scored " + defendHits + " hits this round" );
	alert( "See console.log for detailed results");
	return { "attackHits" : attackHits , "defendHits" : defendHits};
}

function logCombat(attack_defend, type, roll, result) {
	console.log( attack_defend + " " + type + " rolled a " + roll + " and " + result );
}


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
