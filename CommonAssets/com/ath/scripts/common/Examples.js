class Examples extends BaseMonoBehavior {

	function onStart () {
		super.onStart();
	}
	
	function onUpdate () {
		super.onUpdate();
	}

}

class ExampleFunctionPointer extends BaseMonoBehavior {
	private var ptrFunctions = {}; // empty hash of function
	
	function onStart () {
		super.onStart();
		buildFunctionMapping();
	}
	
	// build hash->func map (call from onStart - only needs to happen once)
	private function buildFunctionMapping() {
		ptrFunctions["GameObjectName1"] = function() {
			Debug.Log("This will get executed for objects named GameObjectName1");
		};
		
		ptrFunctions["GameObjectName2"] = function() {
			Debug.Log("This will get executed for objects named GameObjectName1");
		};
	}

	// Now work can be performed per object name
	// Sort of a cheapie backwards polymorphism
	public function doWork( obj : GameObject ) {
		var func : function() : void = ptrFunctions[obj.name] as function() : void;
		if ( func != null ) {
			func();
		}
	}
	
}