<?php

class Unit {
	function __construct( $type = null , $number = 1 , $paired = false , $based = false ) {
		if( $type === null ) {
			return false;
		}
		$this -> firstStrike = false;
		$this -> unitType = "infantry";
		$this -> unitAttack = 0;
		$this -> unitDefense = 0;
		$this -> unitRange = 1;
		$this -> isPaired = $paired; // to pair inf+artillery or tact+fighters/tanks
		$this -> isBased = $based; // to adjust range for naval/air bases
		$this -> setUnitType( $type );
		$this -> setUnitAttributes();

	}

	private function setUnitType( $type ) {
		$this -> unitType = $type;
	}

	public function getUnitType() {
		return $this -> unitType;
	}

	public function getUnitAttack() {
		return $this -> unitAttack;
	}
	public function getUnitDefense() {
		return $this -> unitDefense;
	}

	private function setUnitAttributes() {
		switch( $this -> getUnitType() ) {

			case "infantry":
				if( $this -> isPaired === true ) {
					$this -> setUnitAttack( 2 );
				}
				else {
					$this -> setUnitAttack( 1 );
				}
				$this -> setUnitDefense( 2 );
				$this -> setUnitRange( 1 );
				$this -> setUnitCategory( "land" );
				break;

			case "mechanizedInfantry":
				if( $this -> isPaired === true ) {
					$this -> setUnitAttack( 2 );
				}
				else {
					$this -> setUnitAttack( 1 );
				}
				$this -> setUnitDefense( 2 );
				$this -> setUnitRange( 2 );
				$this -> setUnitCategory( "land" );
				break;

			case "artillery":
				$this -> setUnitAttack( 2 );
				$this -> setUnitDefense( 2 );
				$this -> setUnitRange( 1 );
				$this -> setUnitCategory( "land" );
				break;

			case "armor":
				$this -> setUnitAttack( 3 );
				$this -> setUnitDefense( 3 );
				$this -> setUnitRange( 2 );
				$this -> setUnitCategory( "land" );
				break;



			case "fighter":
				$this -> setUnitAttack( 3 );
				$this -> setUnitDefense( 4 );
				if( $this -> isBased === true ) {
					$this -> setUnitRange( 5 );
				}
				else {
					$this -> setUnitRange( 4 );
				}
				$this -> setUnitCategory( "air" );
				break;

			case "tacticalBomber":
				if( $this -> isPaired ) {
					$this -> setUnitAttack( 4 );
				}
				else {
					$this -> setUnitAttack( 3 );
				}
				$this -> setUnitDefense( 3 );
				if( $this -> isBased === true ) {
					$this -> setUnitRange( 5 );
				}
				else {
					$this -> setUnitRange( 4 );
				}
				$this -> setUnitCategory( "air" );
				break;

			case "strategicBomber":
				$this -> setUnitAttack( 4 );
				$this -> setUnitDefense( 1 );
				if( $this -> isBased === true ) {
					$this -> setUnitRange( 7 );
				}
				else {
					$this -> setUnitRange( 6 );
				}
				$this -> setUnitCategory( "air" );
				break;



			case "transport":
				$this -> setUnitAttack( 0 );
				$this -> setUnitDefense( 0 );
				if( $this -> isBased === true ) {
					$this -> setUnitRange( 3 );
				}
				else {
					$this -> setUnitRange( 2 );
				}
				$this -> setUnitCategory( "naval" );
				break;

			case "uboat":
				$this -> firstStrike = true;
				$this -> setUnitAttack( 2 );
				$this -> setUnitDefense( 1 );
				if( $this -> isBased === true ) {
					$this -> setUnitRange( 3 );
				}
				else {
					$this -> setUnitRange( 2 );
				}
				$this -> setUnitCategory( "naval" );
				break;

			case "destroyer":
				$this -> setUnitAttack( 2 );
				$this -> setUnitDefense( 2 );
				if( $this -> isBased === true ) {
					$this -> setUnitRange( 3 );
				}
				else {
					$this -> setUnitRange( 2 );
				}
				$this -> setUnitCategory( "naval" );
				break;

			case "cruiser":
				$this -> setUnitAttack( 3 );
				$this -> setUnitDefense( 3 );
				if( $this -> isBased === true ) {
					$this -> setUnitRange( 3 );
				}
				else {
					$this -> setUnitRange( 2 );
				}
				$this -> setUnitCategory( "naval" );
				break;

			case "carrier":
				$this -> setUnitAttack( 0 );
				$this -> setUnitDefense( 2 );
				if( $this -> isBased === true ) {
					$this -> setUnitRange( 3 );
				}
				else {
					$this -> setUnitRange( 2 );
				}
				$this -> setUnitCategory( "naval" );
				break;


			case "battleship":
				$this -> setUnitAttack( 4 );
				$this -> setUnitDefense( 4 );
				if( $this -> isBased === true ) {
					$this -> setUnitRange( 3 );
				}
				else {
					$this -> setUnitRange( 2 );
				}
				$this -> setUnitCategory( "naval" );
				break;


			default:
				return false;
		}
	}

	private function setUnitAttack( $attack ) {
		$this -> unitAttack = $attack;
	}

	private function setUnitDefense( $defense ) {
		$this -> unitDefense = $defense;
	}

	private function setUnitRange( $range ) {
		$this -> unitRange = $range;
	}

	private function setUnitCategory( $category ) {
		$validCategories = array( "land" , "air" , "naval" , "noncombat" );
		if( !in_array( $category , $validCategories ) ) {
			return false;
		}
		$this -> unitCategory = $category;
	}
}

?>