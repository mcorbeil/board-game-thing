<?php

class Combat {
	function __construct( $attackersUnits , $defendersUnits) {
		$this -> attackers = new Army( $attackersUnits );
		$this -> defenders = new Army( $defendersUnits );
	}

	/*
	 * This function runs rounds of combat until one or both sides perish!
	*/
	public function runCombatRound() {
		$battleOver = false;
		$myDie = 6;
		$attackHits = 0;
		$defendHits = 0;

		foreach( $this -> attackers as $unitType => $unitData ) {
			for( $i = 0; $i < $unitData["number"]; $i++ ) {
				$myDie = rand( 1 , 6 );
				if( $myDie <= $unitData["attack"] ) {
					$attackHits ++;
				}
			}
		}
		consoleLog( "Attacker has scored " . $attackHits . " hits this round" );

		unset( $unitType , $unitData , $i);

		foreach( $this -> defenders as $unitType => $unitData ) {
			for( $i = 0; $i < $unitData["number"]; $i++ ) {
				$myDie = rand( 1 , 6 );
				if( $myDie <= $unitData["defend"] ) {
					$defendHits++;
				}
			}
		}
		consoleLog( "Defender has scored " . $defendHits . " hits this round" );
		return array( "attackHits" => $attackHits , "defendHits" => $defendHits );
	}

	/*
	 * The original idea here is to auto-remove units, in certain cases, unit removal is vital to combat playing out, we
	 * need to make this interactive at a later point
	 */
	public function assessHits( $hitData ) {
		if( $hitData["defendHits"] > 0 ) {
			foreach( $this -> attackers as $unitType => $unitData ) {
				// If there are units, lose them (this is temporary)
				if( $unitData["number"] > 0 ) {
					if( $unitData["number"] < $hitData["defendHits"] ) {
						$hitData["defendHits"] -= $unitData["number"];
						$this -> attackers -> removeUnit( $unitType, $unitData["number"] );
					}
					else {
						$this -> attackers -> removeUnit( $unitType , $hitData["defendHits"] );
						$hitData["defendHits"] = 0;
					}
				}

				if( $hitData["defendHits"] === 0 ) {
					break;
				}
			}
		}
		if( $hitData["attackHits"] > 0 ) {
			foreach( $this -> defenders as $unitType => $unitData ) {
				// If there are units, lose them (this is temporary)
				if( $unitData["number"] > 0 ) {
					if( $unitData["number"] < $hitData["attackHits"] ) {
						$hitData["attackHits"] -= $unitData["number"];
						$this -> defenders -> removeUnit( $unitType, $unitData["number"] );
					}
					else {
						$this -> defenders -> removeUnit( $unitType , $hitData["attackHits"] );
						$hitData["attackHits"] = 0;
					}
				}

				if( $hitData["attackHits"] === 0 ) {
					break;
				}
			}
		}

	}

	/*
 * It seems like we need to check to verify the battle is over, if both sides have units battle will continue!
 */
	public function assessVictory() {
		$attackerPresent = false;
		$defenderPresent = false;

		if( $this -> attackers -> totalUnits > 0 ) {
			$attackerPresent = true;
		}

		if( $this -> defenders -> totalUnits > 0 ) {
			$defenderPresent = true;
		}

		if( $attackerPresent && $defenderPresent ) {
			return false;
		}
		else if( $attackerPresent ) {
			return "Attacker";
		}
		else if( $defenderPresent ) {
			return "Defender";
	}
		else {
			return "Error";
		}
	}
}
