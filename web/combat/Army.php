<?php

/*
Army class
This should have all units defined eventually, currently keeping the base small to basic land units
 */
$verboseConsole = true;
class Army {
	function __construct( $Units ) {
		// listing units by cost value allows auto-removing casualties to function properly
		$this -> Mans =
			array(
				"type"		=>	"Mans"		,
				"attack"	=>	1			,
				"defend"	=>	2			,
				"number"	=>	0
			);
		$this -> MansPaired =
			array(
				"type"		=>	"MansPaired",
				"attack"	=>	2			,
				"defend"	=>	2			,
				"number"	=>	0
			);
		$this -> Trucks =
			array(
				"type"		=>	"Trucks"		,
				"attack"	=>	1			,
				"defend"	=>	2			,
				"number"	=>	0
			);
		$this ->TrucksPaired =
			array(
				"type"		=>	"TrucksPaired",
				"attack"	=>	2			,
				"defend"	=>	2			,
				"number"	=>	0
			);
		$this -> Artillery =
			array(
				"type"		=>	"Artillery"	,
				"attack"	=>	2			,
				"defend"	=>	2			,
				"number"	=>	0
			);
		$this -> Armor =
			array(
				"type"		=>	"Armor"		,
				"attack"	=>	3			,
				"defend"	=>	3			,
				"number"	=>	0
			);

		$this -> totalUnits = 0;

		foreach( $Units as $type => $number ) {
			$this -> $type = array_merge( $this -> $type , array( "number" => $number ) );
			$this -> totalUnits += $number;
		}

		// After we have set up a list of units in the army, lets search for artillery pairings
		// I am aware this may not be as efficient as an if-else block, but this is the cleanest to write
		for( $j = 0; $j < $this -> Artillery["number"]; $j++ ) {
			if( $this -> Trucks["number"] > 0 ) {
				$this -> Trucks["number"] --;
				$this -> TrucksPaired["number"] ++;
			}
			else if( $this -> Mans["number"] > 0 ) {
				$this -> Mans["number"] --;
				$this -> MansPaired["number"] ++;
			}
			else {
				// If we have no more Mans or Trucks to pair, break out of this loop!
				break;
			}
		}
	}
	public function removeUnit( $type, $number ) {
		$tmp = $this -> $type;
		if( $tmp["number"] - $number >= 0 ) {
			$tmp["number"] -= $number;
			$this -> $type = $tmp;
			$this -> totalUnits -= $number;
			echo "Removing {$number} {$type}\n";
		}
	}
}

function consoleLog( $msg ) {
	echo $msg . "\n";
}