<?php

include( "Army.php" );

$Army = new Army(
	array(
		"Armor" => 9,
		"Artillery" => 2,
		"Mans" => 3
	)
);

print_r( $Army );

$Army -> removeUnit( "Mans" , 1 );

print_r( $Army );

