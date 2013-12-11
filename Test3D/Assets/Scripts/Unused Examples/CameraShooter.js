#pragma strict

@script RequireComponent( Camera );

public var bulletOrig : GameObject;
public var bulletSpeed : int = 1;

public var xSensitivity : double = 5.0;
public var ySensitivity : double = 5.0;
private var xRot : double = 0.0;
private var yRot : double = 0.0;

function Start () {
	 // bulletOrig = GameObject.Find( "Bullet" );
}

function Update () {
	xRot -= Input.GetAxis("Mouse Y") * xSensitivity;
	yRot += Input.GetAxis("Mouse X") * ySensitivity;
	transform.localEulerAngles = Vector3( xRot, yRot, 0 );

	if ( Input.GetButton( "Jump" ) ) {
		// camera.transform.
	}
	if ( Input.GetButton( "Forward" ) ) {
	}
	if ( Input.GetButton( "Back" ) ) {
	}
	if ( Input.GetButton( "StrafeLeft" ) ) {
	}
	if ( Input.GetButton( "StrafeRight" ) ) {
	}
	if ( Input.GetButton( "Fire1" ) ) {
		var bullet : GameObject = Instantiate( bulletOrig );
		bullet.rigidbody.transform.position = camera.transform.position;
		bullet.rigidbody.velocity = camera.transform.forward * 15;
	}
}