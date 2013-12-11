#pragma strict

@script RequireComponent(GameObject)

class ObjectChaser extends Moveable {
	
	public var objectToChase : GameObject;
	public var refreshPeriod : float = 0.5;
	private var refreshTimer : Timer;
	
	public function onStart() {
		super.onStart();
		refreshTimer = new Timer();
		
		//var waypoints : Vector3[] = plotPath( transform.position, objectToChase.transform.position );
		//this.setWaypoints( waypoints );
		plotPath( transform.position, objectToChase.transform.position );
	}
	
	public function onUpdate() {
		super.onUpdate();
		if ( refreshTimer.wait( refreshPeriod ) ) {
			//var waypoints : Vector3[] = plotPath( transform.position, objectToChase.transform.position );
			//this.setWaypoints( waypoints );
			//this.moveOverTimeXZ( waypoint.x, waypoint.z, 1.0 );
		}
	}
	
	private function plotPath( origin : Vector3, destination : Vector3 ) { // : Vector3[] {
		var mark1 : GameObject = GameObject.Find("mark1");
		var mark2 : GameObject = GameObject.Find("mark2");
		var mark3 : GameObject = GameObject.Find("mark3");
		var mark4 : GameObject = GameObject.Find("mark4");
		
		appendWaypoint( mark1.transform.position );
		appendWaypoint( mark2.transform.position );
		appendWaypoint( mark3.transform.position );
		appendWaypoint( mark4.transform.position );
		appendWaypoint( mark1.transform.position );
		
		return null;
	}
	
	private function xplotPath( origin : Vector3, destination : Vector3 ) : Vector3 {
		var hit : RaycastHit;
		Physics.Linecast (origin, destination, hit);
    	if ( hit != null && hit.collider != null && hit.collider.gameObject != null ) {
			if ( hit.collider.gameObject == objectToChase ) {
				Debug.Log("hit player");
				return destination; // we're good	
			} else {
				Debug.Log("hit something else " + hit.collider.gameObject.name );
				// find a way around
				
				#if UNITY_EDITOR
				var start : Vector3 = origin;
				var dest : Vector3 = destination;
				var end : Vector3 = Vector3.MoveTowards( start, dest, 2 );
				Debug.DrawLine(start, end, Color.red, refreshPeriod);
			  	#endif
				
				return destination;
			}
			Debug.Log("Failsafe");
			return origin; // failsafe
		} else {
			Debug.Log("no collision -- probably inside");
		}
	}
}