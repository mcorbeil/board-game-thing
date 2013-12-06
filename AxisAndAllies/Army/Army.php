<?php

include( "../Army/Army.php" );

class Army {
	function construct( $unitList = array() , $based ) { //based = airBase for airforce, naval base for navy
		$this -> unitList = array();
		$this -> unitListRaw = $unitList;

		$this -> curPairedInf = 0;
		if( isset( $this -> unitListRaw["artillery"] ) ) {
			$this -> maxPairedInf += $this -> unitListRaw["artillery"];
		}

		$this -> maxPairedTact = 0;
		if( isset( $this -> unitListRaw["armor"] ) ) {
			$this -> maxPairedTact += $this -> unitListRaw["armor"];
		}
		if( isset( $this -> unitListRaw["fighter"] ) ) {
			$this -> maxPairedTact += $this -> unitListRaw["fighter"];
		}

		foreach( $unitList as $unit => $count ) {
			if( $unit === "tacticalBomber" && $this -> maxPairedTact > 0 ) {
				$this -> unitList[] = new Unit( $unit , )
			}
			else if( $this -> maxPairedInf > 0 && $unit === "")
			$this -> unitList[] = new Unit( $unit , )
		}
	}
}
