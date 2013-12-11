
// generate blocks for the world
// construct me from a MonoBehavior.Awake() and don't forget to call through to doStart and doUpdate
public class BlockEngine extends BaseSystemObject {
	private var globalObject : GameObject;
	private var game : MBGame;

	public function BlockEngine( game : MBGame ) {
		this.game = game;
		this.globalObject = game.getGlobalObject();
	}

	public function doStart() {
	}

	public function doUpdate() {	
	}
	
}

