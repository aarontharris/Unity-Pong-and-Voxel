#pragma strict

class GameObjectGenerator extends BaseMonoBehavior {
	
	public var maxObjects : int = 10;
	public var secondsBetweenObjects : float = 1;
	public var objectToCopy : GameObject;
	
	private var objectCount : int = 0;
	private var timer : Timer;
	
	public function onStart () {
		super.onStart();
		timer = new Timer();
	}
	
	public function onUpdate() {
		super.onUpdate();
		if ( objectCount <= maxObjects ) {
			if ( timer.wait( secondsBetweenObjects ) ) {
				var pos : Vector3 = Vector3( this.transform.position.x, objectToCopy.transform.position.y, this.transform.position.z);
				Instantiate( objectToCopy, pos, Quaternion.identity );
				objectCount++;
			}
		}
	}
}