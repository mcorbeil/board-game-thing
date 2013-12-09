<?php
include( "Combat.php" );
include( "Army.php" );

$combat = new Combat(
	array(
		"Armor" => 9,
		"Artillery" => 2,
		"Mans" => 3
	),
	array(
		"Armor" => 2,
		"Mans" => 10
	)
);

$victory = $combat -> assessVictory();

while( $victory === false ) {
	$hits = $combat -> runCombatRound();

	$combat -> assessHits( $hits );
	$victory = $combat -> assessVictory();
}

$combat -> victor = $victory;
print_r($combat);