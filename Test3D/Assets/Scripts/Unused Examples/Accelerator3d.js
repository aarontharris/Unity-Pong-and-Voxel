#pragma strict

public var monitoring : boolean;
public var velocity : Vector3;
public var angularVelocity : double;

public var key1 : KeyCode = KeyCode.W;
public var key1Vector : Vector3 = Vector3.forward;
public var key2 : KeyCode = KeyCode.S;
public var key2Vector : Vector3 = Vector3.back;
public var key3 : KeyCode = KeyCode.A;
public var key3Vector : Vector3 = Vector3.left;
public var key4 : KeyCode = KeyCode.D;
public var key4Vector : Vector3 = Vector3.right;
public var key5 : KeyCode = KeyCode.Space;
public var key5Vector : Vector3 = Vector3.up;
public var key6 : KeyCode = KeyCode.LeftShift;
public var key6Vector : Vector3 = Vector3.down;

function Start () {
//	rigidbody.velocity.x = velocity.x;
//	rigidbody.velocity.y = velocity.y;
//	rigidbody.velocity.z = velocity.z;
	rigidbody.velocity += velocity;
}

function Update () {
//	if ( Input.GetButton( "Accelerate1" ) ) {
	if ( Input.GetKey( key1 ) ) {
		rigidbody.velocity += key1Vector;
	}
	else if ( Input.GetKey( key2 ) ) {
		rigidbody.velocity += key2Vector;
	}
	else if ( Input.GetKey( key3 ) ) {
		rigidbody.velocity += key3Vector;
	}
	else if ( Input.GetKey( key4 ) ) {
		rigidbody.velocity += key4Vector;
	}
	else if ( Input.GetKey( key5 ) ) {
		rigidbody.velocity += key5Vector;
	}
	else if ( Input.GetKey( key6 ) ) {
		rigidbody.velocity += key6Vector;
	}

	if ( monitoring ) {
		velocity.x = rigidbody.velocity.x;
		velocity.y = rigidbody.velocity.y;
		velocity.z = rigidbody.velocity.z;
	}
}