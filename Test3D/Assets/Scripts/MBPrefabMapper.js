#pragma strict

public class MBPrefabMapper extends BaseMonoBehavior {
	public var prefabs : GameObject[];
	private var prefabsMap = {};

	public function init() {
		buildPrefabsMap();
	}

	private function buildPrefabsMap() {
		for ( var i : int = 0; i < prefabs.length; i++ ) {
			var prefab : GameObject = prefabs[i];
			prefabsMap[prefab.name] = prefab;
		}
	}
	
	public function getPrefabByName( prefabName : String ) : GameObject {
		var prefab : GameObject = prefabsMap[prefabName]; // downcast?
		#if UNITY_EDITOR
    		if ( prefab == null ) {
    			Debug.LogError("Prefab: " + prefabName + " not found, maybe you forgot to add it to GlobalObject's prefabs?" );
    		}
  		#endif
		return prefab;
	}
}
