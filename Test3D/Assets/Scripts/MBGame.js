#pragma strict

@script RequireComponent( GameObject );
@script RequireComponent( MBPrefabMapper );

public class MBGame extends BaseMonoBehavior {
	private var prefabMapper : MBPrefabMapper; // initialized via initGame()
	
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
	}

	function Update () {
		if ( Input.GetButton( "Menu" ) ) {
			Application.Quit();
		}
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
		prefabMapper = gameObject.GetComponent( MBPrefabMapper );
		prefabMapper.init();
		
		// lock the mouse
		Screen.lockCursor = true;
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