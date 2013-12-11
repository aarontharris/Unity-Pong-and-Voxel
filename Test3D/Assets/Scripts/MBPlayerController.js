#pragma strict

@script RequireComponent( Rigidbody );

public class MBPlayerController extends BaseMonoBehavior {

	public var xSensitivity : double = 5.0;
	public var ySensitivity : double = 5.0;
	private var xRot : double = 0.0;
	private var yRot : double = 0.0;
	
	private var cam : Camera;
	
	public var bullet : GameObject;
	
	public var forwardSpeed : double = 1;
	public var strafeSpeed : double = 1;
	public var xAxis : double;
	public var yAxis : double;
	
	private var cursor : PlayerCursor;
	public var debugRTCursor : Vector3;
	public var debugCursor : Vector3;
	
	public function Start() {
		cursor = new PlayerCursor( this );
	}
	
	public function Update() {
		// apply mouse rotation
		xRot -= Input.GetAxis("Mouse Y") * xSensitivity;
		yRot += Input.GetAxis("Mouse X") * ySensitivity;
		transform.localEulerAngles = Vector3( xRot, yRot, 0 );

		rigidbody.velocity = Vector3.zero;
		xAxis = Input.GetAxis("Horizontal");
		yAxis = Input.GetAxis("Vertical");
		transform.position += transform.forward * yAxis * forwardSpeed * Time.deltaTime;
		transform.position += transform.right * xAxis * strafeSpeed * Time.deltaTime;
		
		// update cam if exists
		if ( cam != null ) {
			cam.transform.position = transform.position;
			cam.transform.rotation = transform.rotation;
		}
		
		if ( cursor.onUpdate() ) {
			onCursorPositionChange( cursor.getPreviousCursorPosition(), cursor.getCursorPosition() );
		}
		
		if ( Input.GetButtonUp( "Fire1" ) ) {
			var cursorPrefab : GameObject = getGame().getPrefabByName( "PFCardboardBox" );
			var cursorGameObject = Instantiate( cursorPrefab );
			cursorGameObject.transform.position.x = cursor.getCursorPosition().x;
			cursorGameObject.transform.position.y = cursor.getCursorPosition().y;
			cursorGameObject.transform.position.z = cursor.getCursorPosition().z;
//			if ( bullet != null ) {
//				var bulletCopy : GameObject = Instantiate( bullet );
//				bulletCopy.rigidbody.transform.position = transform.position;
//				bulletCopy.rigidbody.transform.position += transform.forward; // start the bullet outside the head object
//				bulletCopy.rigidbody.transform.rotation = transform.rotation;
//				bulletCopy.rigidbody.velocity = bulletCopy.rigidbody.transform.forward * 15;
//			}
		}
	}
	
	public function onCursorPositionChange( old : Vector3, cur : Vector3 ) {
		// todo draw cursor at new position
		// todo delete cursor at old position
	}

	public function getCamera() {
		return cam;
	}
	public function setCamera( camera : Camera ) {
		this.cam = camera;
	}
}