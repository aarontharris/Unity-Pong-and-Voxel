#pragma strict

public var xVelocity : float;
public var yVelocity : float;
public var zVelocity : float;

function Start () {
	rigidbody.velocity.x = xVelocity;
	rigidbody.velocity.y = yVelocity;
	rigidbody.velocity.z = zVelocity;
}
