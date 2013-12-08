/*
Army class
This should have all units defined eventually, currently keeping the base small
 */
var VerboseConsole = true;
function Army( Units ){
	this.units =
	{
		"Armor"	:
		{
			"type"		:	"Armor"		,
			"attack"	:	3			,
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
			"type"		:	"MansPaired",
			"attack"	:	2			,
			"defend"	:	2			,
			"number"	:	0
		},
		"Trucks"	:
		{
			"type"		:	"Trucks"		,
			"attack"	:	1			,
			"defend"	:	2			,
			"number"	:	0
		},
		"TrucksPaired"	:
		{
			"type"		:	"TrucksPaired",
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
	}
	;
	this.totalUnits = 0;

	for( var i = 0 ; i < Units.length; i++ ) {
		this.units[ Units[i]["type"] ].number = Units[i]["number"];
		this.totalUnits += Units[i]["number"];
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
			alert("Breaking out of artilleryPairLoop");
			break;
		}
	}
}


var attackingArmy =
	new Army(
		[
			{
				"type"	: "Armor",
				"number": 9
			},
			{	"type"	: "Artillery",
				"number":2
			},
			{
				"type"	: "Mans",
				"number":3
			}
		]);

var defendingArmy =
	new Army(
		[
			{
				"type"	:	"Mans",
				"number":	3
			}
		]
	);

$( document ).ready( function() {
	$("#startCombat").click( function() {
		runCombat( attackingArmy, defendingArmy );
	});
});

/*
 * This function runs rounds of combat until one or both sides perish!
*/
function runCombat( attackingArmy, defendingArmy ) {
	var battleOver = false;
	// Wrapped in a while to auto-combat to the death!
	while( battleOver === false ) {
		var myDie = 6;
		var attackHits = 0;
		var defendHits = 0;
		$.each( attackingArmy.units, function( index, unit) {
			for( var i = 0; i < unit.number; i++ ) {
				myDie = getRandomInt( 1 , 6 );
				if( myDie <= unit.attack ) {
					attackHits ++;
					logCombat( "Attacking" , unit.type , myDie , "Hit!" )
				}
				else {
					logCombat( "Attacking" , unit.type , myDie , "Missed!" )
				}
			}
		});
		alert( "Attacker has scored " + attackHits + " hits this round" );

		$.each( defendingArmy.units, function( index, unit ) {
			for( var i = 0; i < unit.number; i++ ) {
				myDie = getRandomInt( 1 , 6 );
				if( myDie <= unit.defend ) {
					defendHits++;
					logCombat( "Defending" , unit.type , myDie , "Hit!" )
				}
				else {
					logCombat( "Defending" , unit.type , myDie , "Missed!" )
				}
			}
		});
		alert( "Defender has scored " + defendHits + " hits this round" );
		assessHits({ "attackHits" : attackHits , "defendHits" : defendHits});
		battleOver = assessVictory();
		if( battleOver !== false ) {
			alert( battleOver + " has slaughtered their enemies" );
		}
	}
}

/*
 * Simple function to dump combat results to console.log
 * Set VerboseConsole ^^ at top of file to "false" to silence this
 */
function logCombat(attack_defend, type, roll, result) {
	if( VerboseConsole ) {
		console.log( attack_defend + " " + type + " rolled a " + roll + " and " + result );
	}
}

/*
 * The original idea here is to auto-remove units, in certain cases, unit removal is vital to combat playing out, we
 * should consider making this interactive at a later point
 */
function assessHits( hitData ) {
	// Again, loops may not be efficient, but they sure are clear to follow and clean to write
	for( var i = 0; i < hitData.defendHits; i++ ) {
		if( attackingArmy.units.Mans.number > 0 ) {
			logDeath( "Mans" , "Attacker", i + 1 );
			attackingArmy.units.Mans.number --;
		}
		else if( attackingArmy.units.MansPaired.number > 0 ) {
			attackingArmy.units.MansPaired.number --;
			logDeath( "MansPaired" , "Attacker" , i + 1 );
		}
		else if( attackingArmy.units.Trucks.number > 0 ) {
			attackingArmy.units.Trucks.number --;
			logDeath( "Trucks" , "Attacker" , i + 1 );
		}
		else if( attackingArmy.units.TrucksPaired.number > 0 ) {
			logDeath( "TrucksPaired" , "Attacker" , i + 1 );
			attackingArmy.units.TrucksPaired.number --;
		}
		else if( attackingArmy.units.Armor.number > 0 ) {
			attackingArmy.units.Armor.number --;
			logDeath( "Armor" , "Attacker" , i + 1 );
		}
		else {
			// No more units to lose, break out of loop, army is dead
			logDeath( "Attacker Has No Units","Attacker" , i + 1 );
			break;
		}
		attackingArmy.totalUnits --;
	}
	for( var j = 0; j < hitData.attackHits; j++ ) {
		if( defendingArmy.units.Mans.number > 0 ) {
			defendingArmy.units.Mans.number --;
			logDeath( "Mans" , "Defender" , j + 1 );
		}
		else if( defendingArmy.units.MansPaired.number > 0 ) {
			defendingArmy.units.MansPaired.number --;
			logDeath( "MansPaired" , "Defender" , j + 1 );
		}
		else if( defendingArmy.units.Trucks.number > 0 ) {
			defendingArmy.units.Trucks.number --;
			logDeath( "Trucks" , "Defender" , j + 1 );
		}
		else if( defendingArmy.units.TrucksPaired.number > 0 ) {
			defendingArmy.units.TrucksPaired.number --;
			logDeath( "TrucksPaired" , "Defender" , j + 1 );
		}
		else if( defendingArmy.units.Armor.number > 0 ) {
			defendingArmy.units.Armor.number --;
			logDeath( "Armor" , "Defender" , j + 1 );
		}
		else {
			// No more units to lose, break out of loop, army is dead
			logDeath( "Defender Has No Units" , "Defender" , j + 1 );
			break;
		}
		defendingArmy.totalUnits --;
	}
}
function logDeath( type, attack_defend, number ) {
	if( VerboseConsole ) {
		console.log( attack_defend + " is losing " + number + " " + type );
	}
}

/*
 * It seems like we need to check to verify the battle is over, if both sides have units battle will continue!
 */
function assessVictory() {
	var attackerPresent = false;
	var defenderPresent = false;

	if( attackingArmy.totalUnits > 0 ) {
		attackerPresent = true;
	}

	if( defendingArmy.totalUnits > 0 ) {
		defenderPresent = true;
	}

	if( attackerPresent && defenderPresent ) {
		return false;
	}
	else if( attackerPresent ) {
		return "Attacker";
	}
	else if( defenderPresent ) {
		return "Defender"
	}
	else {
		return "Error";
	}
}

// If anyone would like to propose different RNG logic, feel free

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
