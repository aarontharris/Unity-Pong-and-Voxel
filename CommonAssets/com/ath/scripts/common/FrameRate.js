#pragma strict

@script RequireComponent(GUIText)

public var refreshRateSeconds : float = 1.0;
private var lastUpdate : float;

function Update () {
	if ( Time.realtimeSinceStartup - lastUpdate > refreshRateSeconds ) {
		guiText.text = (1 / Time.deltaTime).ToString("0.000");
		lastUpdate = Time.realtimeSinceStartup;
	}
}