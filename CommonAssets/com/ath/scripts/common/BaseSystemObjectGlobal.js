#pragma strict

class BaseSystemObjectGlobal extends BaseSystemObject {

	public var G : GlobalRefScript;

	public function BaseSystemObjectGlobal( G : GlobalRefScript ) {
		super();
		this.G = G;
//		G = GameObject.FindGameObjectsWithTag("__GLOBAL__")[0].GetComponent(GlobalRefScript);
//		#if UNITY_EDITOR
//    	if ( G == null ) {
//    		Debug.Log("You must create only one GameObject with a GlobalRefScript tagged as '__GLOBAL__'");
//    	}
//  		#endif
	}
	
	public function log() : ScreenLogger {
		return super.log( G );
	}
	
}