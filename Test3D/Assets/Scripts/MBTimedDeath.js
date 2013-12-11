#pragma strict

public var delaySec : double;
private var lifeSec : double = 0;

function Start() {
	Destroy( gameObject, delaySec );
}

function Update () {
	lifeSec += Time.deltaTime;
	
	if ( lifeSec >= ((delaySec / 4)*3) ) { // 75% of max age
		gameObject.renderer.material.color.a = 0.25;
	} else if ( lifeSec >= (delaySec/2) ) { // 50% of max age
		gameObject.renderer.material.color.a = 0.50;
	}
}