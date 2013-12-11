#pragma strict

@script RequireComponent(Transform)

/*

When a class that extends MonoBehaviour has public variables, they can be configured via the IDE.
A public variable of type extends System.Object within a class that extends MonoBehavior can also be configured.
However System.Object's must be instantiated.  An instantiated object at runtime will overwrite config values from the IDE.
A trick to sneak past this is to have a public and private variable of the System Object and copy the config after instantiation.

*/

class ScreenLogger extends BaseSystemObjectGlobal {
	
	public var numberOfLines : int = 5;
	public var lineSpacing : float = 0.03;
	public var position : Vector3 = new Vector3(0,1,0);
	public var guiTextToCopy : GUIText;
	private var lines : GUIText[];
	
	public function ScreenLogger( G : GlobalRefScript, config : ScreenLogger ) {
		super( G );
		this.numberOfLines = config.numberOfLines;
		this.lineSpacing = config.lineSpacing;
		this.position = config.position;
		this.guiTextToCopy = config.guiTextToCopy;
		lines = new GUIText[numberOfLines];
		for ( var i : int = 0; i < numberOfLines; i++ ) {
			var p : Vector3 = new Vector3( position.x, (position.y - (lineSpacing * i)), position.z );
			lines[i] = G.Instantiate( guiTextToCopy, p, Quaternion.identity );
		}
	}
	
	public function debug( msg : String ) {
		if ( numberOfLines > 1 ) {
			demoteLines();
			lines[numberOfLines - 1].text = msg;
		}
	}
	
	private function demoteLines() {
		for ( var i : int = 0; i < (numberOfLines - 1); i++ ) {
			if ( lines[i + 1].text != null ) {
				lines[i].text = lines[i + 1].text;
			}
		}
	}
}