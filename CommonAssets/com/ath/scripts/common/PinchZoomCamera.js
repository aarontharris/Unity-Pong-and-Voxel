#pragma strict

@script RequireComponent(Camera)

class PinchZoomCamera extends BaseMonoBehavior {
	
	public var minHeight : float = 10;
	public var maxHeight : float = 150;
	private var cam : Camera;
	private var lastDistance : float = -1;
	
	public function onStart() {
		super.onStart();
		this.cam = this.GetComponent(Camera);
	}
	
	public function onUpdate() {
		super.onUpdate();
		
		if ( Input.touchCount >= 2 ) {
			Debug.Log("Two touches");
		    var touch0 : Vector2 = Input.GetTouch(0).position;
		    var touch1 : Vector2 = Input.GetTouch(1).position;
		    var distance : float = Vector2.Distance(touch0, touch1);
		    
		    if ( lastDistance > 0 ) {
		    	var newDist : float = cam.transform.position.y - ( lastDistance - distance );
		    	if ( newDist < minHeight ) {
		    		cam.transform.position.y = minHeight;
		    	} else if ( newDist > maxHeight ) {
		    		cam.transform.position.y = maxHeight;
		    	} else {
		    		cam.transform.position.y = newDist;
		    	}
		    }
		    
		    lastDistance = distance;
		}
	}
	
}