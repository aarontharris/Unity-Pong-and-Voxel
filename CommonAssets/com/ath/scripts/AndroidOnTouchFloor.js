#pragma strict

class AndroidOnTouchFloor extends BaseMonoBehavior {
	
	public var charMov : Moveable;
	
	public function onStart() {
		super.onStart();
		//charMov = G.mainChar.GetComponent(Moveable);
	}
	
	public function onUpdate() {
		super.onUpdate();
		var hit : RaycastHit;
		var ray : Ray;
		var touched : GameObject;
	
		// touchBegan
		if ( Input.GetMouseButtonUp( 0 ) ) {
		// if ( Input.GetMouseButtonDown( 0 ) ) {
			ray = Camera.main.ScreenPointToRay (Input.mousePosition);
			var maxRayDist : float = (G.cam.transform.position.y - G.floor.transform.position.y) * 2;
			if ( Physics.Raycast(ray.origin, ray.direction, hit, maxRayDist) ) {
				touched = hit.collider.gameObject;
				
				if ( touched ) {
					// if ( touched == G.floor ) { // only react if we touched the floor
					//newObjectAt( character, hit.point.x, hit.point.y, hit.point.z );
					if ( charMov != null ) {
						charMov.moveOverTimeXZ( hit.point.x, hit.point.z, 1.0 );
						log().debug( "clicked " + hit.point.x + " x " + hit.point.z );
					}
					// } else {
					//Destroy( touched );
					//}
				}
			}
		}
	}
}
