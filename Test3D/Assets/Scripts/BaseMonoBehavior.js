#pragma strict

class BaseMonoBehavior extends MonoBehaviour {
	private var globalObject : GameObject;
	private var game : MBGame;

	public function onAwake() {
	}

	public function Start() {
		#if UNITY_EDITOR
    	// cool #defines for debugging, this code only runs in the unity editor!
  		#endif
	}
	
	public function getGlobalObject() : GameObject {
		if ( globalObject == null ) {
			globalObject = gameObject.FindWithTag("__GLOBALOBJECT__");
		}
		return globalObject;
	}
	
	public function getGame() : MBGame {
		if ( game == null ) {
			game = getGlobalObject().GetComponent( MBGame );
		}
		return game;
	}
}