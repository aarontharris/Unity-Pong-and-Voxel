#pragma strict

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
}

function Update () {
	if ( Input.GetKey( key1 ) ) {
		transform.position += key1Vector;
	}
	else if ( Input.GetKey( key2 ) ) {
		transform.position += key2Vector;
	}
	else if ( Input.GetKey( key3 ) ) {
		transform.position += key3Vector;
	}
	else if ( Input.GetKey( key4 ) ) {
		transform.position += key4Vector;
	}
	else if ( Input.GetKey( key5 ) ) {
		transform.position += key5Vector;
	}
	else if ( Input.GetKey( key6 ) ) {
		transform.position += key6Vector;
	}
}
