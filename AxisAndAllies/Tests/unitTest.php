<?php

include( "../Unit/Unit.php" );

$Unit = new Unit( "infantry" , 1 , true, false );

print_r( array(
	$Unit -> getUnitAttack() ,
	$Unit -> getUnitDefense() ,
	$Unit -> getUnitType()
));