#pragma strict

function Start() {
	this.onStart();
}

function Update() {
	this.onUpdate();
}

class BaseMonoBehavior extends MonoBehaviour {
	
	protected var G : GlobalRefScript;

	public function onStart() {
		G = GameObject.FindGameObjectsWithTag("__GLOBAL__")[0].GetComponent(GlobalRefScript);
		#if UNITY_EDITOR
    	if ( G == null ) {
    		Debug.Log("You must create only one GameObject with a GlobalRefScript tagged as '__GLOBAL__'");
    	}
  		#endif
	}

	public function onUpdate() {
	}
	
	public function log() : ScreenLogger {
		return G.getLogger();
	}
	
}