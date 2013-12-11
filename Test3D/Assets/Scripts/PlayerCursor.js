#pragma strict

public class PlayerCursor extends BaseSystemObject {
	private var playerCtrl : MBPlayerController;
	private var cam : Camera;
	private var previousCursorPosition : Vector3 = Vector3.zero;
	private var cursorPosition : Vector3 = Vector3.zero;
	private var cursorGameObject : GameObject;
	
	public function PlayerCursor( playerCtrl : MBPlayerController ) {
		this.playerCtrl = playerCtrl;
		this.cam = playerCtrl.getCamera();
		
		cursorGameObject = playerCtrl.getGlobalObject().Instantiate( playerCtrl.getGame().getPrefabByName( "PFCursor" ) );
	}

	/** returns true if changed */
	public function onUpdate() : boolean {
		try {
			var hit : RaycastHit;
			var fwd = cam.transform.TransformDirection ( Vector3.forward );
			if ( Physics.Raycast ( cam.transform.position, fwd, hit, 10.0 ) ) {
				Debug.DrawRay(hit.point, hit.normal, Color.green);
				
				playerCtrl.debugRTCursor = hit.point;
				var cursorCenter : Vector3 = hit.point + (hit.normal / 2);
				cursorCenter = translatePointToGridPoint( cursorCenter, cursorCenter );
//				Debug.Log( "IN: " + tmpIn + ", OT: " + tmpOut );

	//			Debug.Log( "pt: " + hit.point + ", nm: " + hit.normal + ", db: " + cursorDebug + ", ps: " + cursorCenter );
				
				if ( cursorPosition != cursorCenter ) {
					previousCursorPosition = cursorPosition;
					cursorPosition = cursorCenter;
					cursorGameObject.transform.position.x = cursorPosition.x;
					cursorGameObject.transform.position.y = cursorPosition.y;
					cursorGameObject.transform.position.z = cursorPosition.z;
					playerCtrl.debugCursor = cursorPosition;
				}
			}
		} catch ( err ) {
			Debug.LogError("PlayerCursor ERR: Likely missing camera on player object");
		}
		return false;
	}

	public function getCursorPosition() : Vector3 {
		return cursorPosition;
	}
	
	public function getPreviousCursorPosition() : Vector3 {
		return previousCursorPosition;
	}
	
	/**
	 * @param inPoint - the point that you want to convert
	 * @param outPoint - the Vector3 object you would like the conversion placed in and returned
	 * @return outPoint with the converted data
	 */
	public function translatePointToGridPoint( inPoint : Vector3, outPoint : Vector3 ) : Vector3 {
		var x : int = inPoint.x;
		var y : int = inPoint.y;
		var z : int = inPoint.z;
		outPoint.x = x + (( ( inPoint.x >= 0 ) ? 1 : -1 ) * 0.5f);
		outPoint.y = y + (( ( inPoint.y >= 0 ) ? 1 : -1 ) * 0.5f);
		outPoint.z = z + (( ( inPoint.z >= 0 ) ? 1 : -1 ) * 0.5f);
		return outPoint;
	}
}