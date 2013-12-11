#pragma strict

class BaseSystemObject extends System.Object {

	public function BaseSystemObject() {
	}
	
	public function log( G : GlobalRefScript ) : ScreenLogger {
		return G.getLogger();
	}
	
}