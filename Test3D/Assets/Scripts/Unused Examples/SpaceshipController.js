#pragma strict

@script RequireComponent( Rigidbody );

public class SpaceshipController extends BaseMonoBehavior {
	public var cam : Camera;
	public var xSensitivity : double = 5.0;
	public var ySensitivity : double = 5.0;
	private var xRot : double = 0.0;
	private var yRot : double = 0.0;

	public var bullet : GameObject;
	public var speed : double;
	public var hasMomentum : boolean;

	function onAwake() {
//		Find("_GlobalObject");
	}

	function onStart () {
	}

	function onUpdate () {
		xRot -= Input.GetAxis("Mouse Y") * xSensitivity;
		yRot += Input.GetAxis("Mouse X") * ySensitivity;
		transform.localEulerAngles = Vector3( xRot, yRot, 0 );

		if ( Input.GetButton( "Jump" ) ) {
			// camera.transform.
		}
		
		if ( !hasMomentum ) {
			rigidbody.velocity = Vector3.zero;
		}
		
		rigidbody.velocity += transform.forward * Input.GetAxis("Vertical") * Time.deltaTime;
		rigidbody.velocity += transform.right * Input.GetAxis("Horizontal") * Time.deltaTime;
		if ( cam != null ) {
			cam.transform.position = transform.position;
			cam.transform.rotation = transform.rotation;
		}
		
		if ( Input.GetButton( "Fire1" ) ) {
			var bulletCopy : GameObject = Instantiate( bullet );
			bulletCopy.rigidbody.transform.position = transform.position;
			bulletCopy.rigidbody.transform.position += transform.forward; // start the bullet outside the head object
			bulletCopy.rigidbody.transform.rotation = transform.rotation;
			bulletCopy.rigidbody.velocity = bulletCopy.rigidbody.transform.forward * 15;
		}
		
		speed = rigidbody.velocity.magnitude;
	}
}