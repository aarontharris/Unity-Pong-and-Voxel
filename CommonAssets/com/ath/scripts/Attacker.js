#pragma strict

@script RequireComponent( GameObject );

/*

Must have a Rigidbody
Must be a trigger

*/

class Attacker extends TakesDamage {

	public var tagsToAttack : String[];
	public var coolDownSeconds : float = 1;
	public var range : float = 2;
	public var dmg : float = 1;

	private var timer : Timer;
	private var collisions = {};
	private var thisGameObject : GameObject;
	
	public function onStart () {
		super.onStart();
		this.timer = new Timer();
		thisGameObject = gameObject;
		buildCollisionMap();
	}
	
	public function onUpdate() {
		super.onUpdate();
		if ( timer.doThenWait( coolDownSeconds ) ) {
			var myPos : Vector2 = new Vector2( thisGameObject.transform.position.x, thisGameObject.transform.position.y );
			for ( var i : int = 0; i < tagsToAttack.length; i++ ) {
				var targets : GameObject[] = G.getByTag( tagsToAttack[i] );
				if ( targets != null ) {
					for ( var j : int = 0; j < targets.length; j++ ) {
						var t : GameObject = targets[j];
						var theirPos : Vector2 = new Vector2( t.transform.position.x, t.transform.position.y );
						if ( Vector2.Distance( myPos, theirPos ) <= range ) {
							var takesDamage : TakesDamage = t.GetComponent(TakesDamage);
							if ( takesDamage != null ) {
								takesDamage.doSimpleDamage( dmg );
							}
						}
						
						#if UNITY_EDITOR
						var start : Vector3 = thisGameObject.transform.position;
						var dest : Vector3 = t.gameObject.transform.position;
						var end : Vector3 = Vector3.MoveTowards( start, dest, range );
						Debug.DrawLine(start, end, Color.green, coolDownSeconds);
					  	#endif
					}
				}
			}
		}
		
		
	}
	
	// override TakesDamage.onHpChange
	public function onHpChange( before : float, after : float ) {
		if ( after <= 0 ) {
			Destroy( thisGameObject );
		}
	}
	
	function OnTriggerEnter (other : Collider) {
		var func : function() : void = collisions[other.name + "_stay"] as function() : void;
		if ( func != null ) {
			func();
		}
	}
	
	private function buildCollisionMap() {
		//collisions["mainchar_stay"] = function() {
		//};
	}
}