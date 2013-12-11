#pragma strict

/*

Must have a Rigidbody
Must be a trigger

*/

class MainCharacter extends TakesDamage {
	private var timer : Timer;
	private var collisions = {};
	
	public function onStart () {
		super.onStart();
		this.timer = new Timer();
		buildCollisionMap();
	}
	
	public function onUpdate() {
		super.onUpdate();
	}
	
	function OnTriggerEnter (other : Collider) {
		var func : function() : void = collisions[other.name + "_enter"] as function() : void;
		if ( func != null ) {
			func();
		}
	}
	
	private function buildCollisionMap() {
		collisions["zombie1_enter"] = function() {
			//Debug.Log("pow pow zombie1 from mainchar");
		};
	}

	// override TakesDamage.onHpChange
	public function onHpChange( before : float, after : float ) {
		if ( after <= 0 ) {
			Destroy( gameObject );
		}
	}
}