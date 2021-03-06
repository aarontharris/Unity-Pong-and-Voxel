﻿#pragma strict

@script RequireComponent( GameObject );
@script RequireComponent( MBPrefabMapper );

public class MBGame extends BaseMonoBehavior {
//	private var messaging : 
	private var prefabMapper : MBPrefabMapper; // initialized via initGame()
	private var blockEngine : BlockEngine;
	public final var blockSize : double = 1;

	function Awake() {
		#if UNITY_EDITOR
    		startupCheckDebug();
  		#endif
  		startupCheckRelease();
  		initGame();
  		initPlayer();
	}

	function Start () {
		blockEngine.doStart();
	}

	function Update () {
		if ( Input.GetButton( "Menu" ) ) {
			Application.Quit();
		}
		blockEngine.doUpdate();
	}
	
	// Tests only run in debug mode to help identify code folleys
	function startupCheckDebug() {
		// ensure global object exists
		var globalObject : GameObject = getGlobalObject();
		if ( globalObject == null ) {
			Debug.LogError("GameObject with '__GLOBALOBJECT__' tag was not found");
			return;
		} 
	}
	
	// Tests to ensure the system is good order and meets requirements
	function startupCheckRelease() {
	}
		
	function initGame() {
		// lock the mouse
		Screen.lockCursor = true;
		
		prefabMapper = gameObject.GetComponent( MBPrefabMapper );
		prefabMapper.init();
		
		blockEngine = new BlockEngine( this );
	}
	
	function initPlayer() {
		var prefabPlayer : GameObject = getPrefabByName( "PFPlayerHead" );
		var player : GameObject = Instantiate( prefabPlayer );
		player.transform.position = Camera.main.transform.position;
		player.transform.rotation = Camera.main.transform.rotation;
		var playerCtrl : MBPlayerController = player.GetComponent( MBPlayerController );
		playerCtrl.setCamera( Camera.main );
	}
	
	public function getPrefabByName( prefabName : String ) : GameObject {
		return prefabMapper.getPrefabByName( prefabName );
	}
}