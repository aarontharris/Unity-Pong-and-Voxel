#pragma strict

public var moveUp : KeyCode;
public var moveDn : KeyCode;
public var speed  : float = 10.0f;

function Update () {
	if ( Input.GetKey( moveUp ) ) {
		rigidbody2D.velocity.y = speed;
	} else if ( Input.GetKey( moveDn ) ) {
		rigidbody2D.velocity.y = -speed;
	} else {
		rigidbody2D.velocity.y = 0;
	}
}