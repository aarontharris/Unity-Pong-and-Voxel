#pragma strict

class Timer extends BaseSystemObject {
	
	private var active : boolean;
	private var seconds : float;
	private var started : float;
	
	public function Timer() {
		super();
	}
	
	// returns true every "seconds"
	public function wait( seconds : float ) : boolean {
		if ( this.active ) {
			if ( Time.realtimeSinceStartup - this.started >= this.seconds ) {
				this.active = false;
				return true;
			}
		} else {
			this.seconds = seconds;
			this.active = true;
			this.started = Time.realtimeSinceStartup;
		}
		return false;
	}
	
	// returns true the first time, then true again every "seconds"
	public function doThenWait( seconds : float ) : boolean {
		var tmp : float = started;
		return wait( seconds ) || ( started == 0 );
	}
}