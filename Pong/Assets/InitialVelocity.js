#pragma strict

public var xVelocity : float;
public var yVelocity : float;

function Start () {
	rigidbody2D.velocity.x = xVelocity;
	rigidbody2D.velocity.y = yVelocity;
}
