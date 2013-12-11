#pragma strict

public var tileOrder : int[] = [ 0 ];
public var uvAnimationTileCols : int = 1; // number of columns of the sheet
public var uvAnimationTileRows : int = 1; // number of rows on the sheet
public var durationSeconds : float = 0.5; // seconds to complete animation

private var framesPerSecond : float;

private var index : int;
private var msg : String;
private var size : Vector2;
private var uIndex : float;
private var vIndex : float;
private var offset : Vector2;
private var lastUpdate : float;
private var periodSec : float;
private var mat : Material;
private var timeStart : float;
private var time : float;

function Start () {
	size = Vector2 (1.0 / uvAnimationTileCols, 1.0 / uvAnimationTileRows); // Size of every tile
	mat = renderer.material;
	timeStart = Time.time;
	lastUpdate = -999999;
}

function Update () {
	framesPerSecond = tileOrder.Length / durationSeconds;
	periodSec = (1.0 / framesPerSecond) / 2;
	time = Time.time - timeStart;
	
	// Only update when necessary
	if ( time - lastUpdate > periodSec ) {
		lastUpdate = time;

    	// Calculate index
    	msg = "( " + time + " * " + framesPerSecond + " ) % " + tileOrder.Length + " = " + ((time * framesPerSecond) % tileOrder.Length);
    	index = tileOrder[(time * framesPerSecond) % tileOrder.Length];
    
    	// split into horizontal and vertical index
    	uIndex = index % uvAnimationTileCols;
    	vIndex = index / uvAnimationTileRows;

    	// build offset
    	// v coordinate is the bottom of the image in opengl so we need to invert.
    	offset.x = uIndex * size.x;
    	offset.y = 1.0 - size.y - vIndex * size.y;
    
    	// set texture
    	mat.SetTextureOffset ("_MainTex", offset);
    	mat.SetTextureScale ("_MainTex", size);
    }
}