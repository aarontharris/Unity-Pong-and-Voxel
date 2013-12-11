#pragma strict

@script RequireComponent(Transform)

class Moveable extends BaseMonoBehavior {
	private static var DEST_INVALID = new Vector3( 0, -1, 0 );
	
	public var maxVelocity     : float;	
	private var tform          : Transform;
	private var dest           : Vector3 = DEST_INVALID;
	private var throttle       : float;
	private var velocity : Vector3 = Vector3.zero; // reserved for SmoothDamp
	private var waypoints : Vector3[] = new Vector3[1];
	
	private var timer : Timer;
	
	public function onStart() {
		super.onStart();
		timer = new Timer();
		tform = gameObject.GetComponent(Transform);
		dest = tform.position;
		waypoints[0] = DEST_INVALID;
		//buildCollisionMap();
	}
	
	public function onUpdate() {
		super.onUpdate();
		
		// periodically update our destination from the waypoint list
		if ( timer.doThenWait( 1 ) ) {
			var idx : int = getDestWaypoint();
			if ( idx >= 0 ) {
				Debug.Log("updating dest");
				dest = getWaypoint( idx );
			} else {
				Debug.Log("invalidating dest");
				dest = DEST_INVALID;
			}
		}
		
		if ( isValid( dest ) ) {
			Debug.Log("valid dest");
			var newPos : Vector3 = Vector3.SmoothDamp( tform.position, dest, velocity, Time.deltaTime, maxVelocity * throttle );
			if ( tform.position.x == newPos.x && tform.position.y == newPos.y && tform.position.z == newPos.z ) {
				dest = DEST_INVALID;
				
			} else {
				tform.position = newPos;
			}
		}
	}
	
	// Find the waypoint this object should be moving towards, preceeding waypoints are DEST_INVALID
	// @return - the index of the destination waypoint or -1 if no valid waypoints
	public function getDestWaypoint() : int {
		for ( var idx : int = 0; idx < getWaypoints().Length; idx++ ) {
			if ( isValid( getWaypoints()[idx] ) ) {
				return idx;
			}
		}
		return -1; // route complete -- stop moving
	}
	
	public function setWaypoints( waypoints : Vector3[] ) {
		this.waypoints = waypoints;
	}
	
	private function getWaypoints() : Vector3[] {
		return this.waypoints;
	}
	
	public function getWaypoint( index : int ) : Vector3 {
		if ( getWaypoints().Length >= (index + 1) ) {
			return getWaypoints()[index];
		}
		return DEST_INVALID;
	}
	
	public function replaceWaypoint( index : int, newWaypoint : Vector3 ) {
		if ( getWaypoints().Length >= (index + 1) ) {
			getWaypoints()[index] = newWaypoint;
		}
	}
	
	
	public function replaceWaypoint( oldWaypoint : Vector3, newWaypoint : Vector3 ) {
		for ( var idx : int = 0; idx < getWaypoints().Length; idx++ ) {
			if ( getWaypoint( idx ) == oldWaypoint ) {
				replaceWaypoint( idx, newWaypoint );
			}
		}
	}
	
	public function appendWaypoint( waypoint : Vector3 ) {
		//getWaypoints()[getWaypoints().Length] = waypoint;
		var size : int = getWaypoints().Length;
		var tmp : Vector3[] = new Vector3[size + 1];
		for ( var idx : int = 0; idx < size; idx++ ) {
			tmp[idx] = getWaypoints()[idx];
		}
		tmp[size] = waypoint;
	}
	
	public function clearWaypoint( idx : int ) {
		replaceWaypoint( idx, DEST_INVALID );
	}
	
	public function isValid( waypoint : Vector3 ) : boolean {
		return waypoint != null && waypoint != DEST_INVALID;
	}
	
	public function setThrottle( throttle : float ) {
		this.throttle = throttle;
	}
	
	// Move the object to the desired destination over time
	// x,y,z represents the desired destination
	// throttle represents the 0.0 to 1.0 percentage of this objects maxVelocity by which it should travel
	public function moveOverTimeXYZ( x : float, y : float, z : float, throttle : float ) : void {
		//this.dest = new Vector3( x, y, z );
		//setWaypoints( new Vector3[1] { new Vector3( x, y, z ) } );
		var tmp : Vector3[] = new Vector3[1];
		tmp[0] = new Vector3( x, y, z );
		setWaypoints( tmp );
		setThrottle( throttle );
 	}

	// Move the object to the desired destination over time
	// x,z represents the desired destination
	// throttle represents the 0.0 to 1.0 percentage of this objects maxVelocity by which it should travel
	public function moveOverTimeXZ( x : float, z : float, throttle : float ) : void {
		//this.dest = new Vector3( x, tform.position.y, z );
		//setThrottle( throttle );
		moveOverTimeXYZ( x, tform.position.y, z, throttle );
	}
	
//	private function collisionKey( other : Collider ) : String {
//		var thisName : String = this.gameObject.name;
//		var othrName : String = other.name;
//		var key : String;
//		if ( String.Compare(thisName, othrName) < 0 ) {
//			key = thisName + ".enter." + othrName;
//		} else {
//			key = othrName + ".enter." + thisName;
//		}
//		return key;
//	}
//	
//	private var collisions = {};
//	private function buildCollisionMap() {
//		collisions["generic_enter"] = function( other : Collider ) {
//			var key : String = collisionKey( other );
//			Debug.Log( key );
//		};
//		collisions["mainchar.enter.zombie1"] = function( other : Collider ) {
//			Debug.Log( other.name + " entered " + this.gameObject.name );
//		};
//	}
//	
//	function OnTriggerEnter (other : Collider) {
//		var key : String = collisionKey( other );
//		var func : function( Collider ) : void = collisions[key] as function( Collider ) : void;		
//		if ( func == null ) {
//			func = collisions["generic_enter"] as function( Collider ) : void;
//		}
//		func( other );
//	}
	
}