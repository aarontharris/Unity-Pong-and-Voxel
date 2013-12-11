#pragma strict


class GlobalRefScript extends BaseMonoBehavior {
	
	public var cam : Camera;
	public var mainChar : GameObject;
	public var floor : GameObject;
	public var screenLoggerTextToCopy : GUIText;
	public var logConfig : ScreenLogger; // externally visible for user config
	private var logger : ScreenLogger; // internal for instantiation
	
	public function onStart() {
		super.onStart();
		logger = new ScreenLogger( this, logConfig );
	}
	
	public function onUpdate() {
		super.onUpdate();
	}

	public function getLogger() : ScreenLogger {
		return logger;
	}
	
// tried this but didnt seem to help much	
//	private var tagMap = {};
//	private var tagUpdate = {};
//	private var refreshInterval = 5;
//	public function xgetByTag( tag : String ) : GameObject[] {
//		var match : GameObject[] = tagMap[tag];
//		var timer : Timer = tagUpdate[tag] as Timer;
//		if ( timer == null ) {
//			timer = new Timer();
//			tagUpdate[tag] = timer;
//		}
//		if ( timer.doThenWait( refreshInterval ) ) {
//			match = GameObject.FindGameObjectsWithTag( tag );
//			tagMap[tag] = match;
//		}
//		return match;
//	}

	// Make me better? - my tests suggest they're already doing some optimizations behind the scenes
	public function getByTag( tag : String ) : GameObject[] {
		return GameObject.FindGameObjectsWithTag( tag );
	}
	
}
