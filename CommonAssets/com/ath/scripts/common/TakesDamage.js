#pragma strict

@script RequireComponent( GameObject );

class TakesDamage extends BaseMonoBehavior {
	public var maxHitpoints : float;
	
	public var curHitpoints : float;
	
	public function onStart() {
		super.onStart();
		curHitpoints = maxHitpoints;
	}
	
	public function getHp() : float {
		return curHitpoints;
	}
	
	public function doSimpleDamage( dmg : float ) : float {
		var before : float = curHitpoints;
		curHitpoints -= dmg;
		if ( before != curHitpoints ) {
			onHpChange( before, curHitpoints );
		}
	}
	
	//	public function doChanceDamage( dmg : float ) : float {
	//		var appliedDamage = dmg * (myLuck/theirLuck) * (myStr/theirStr) * (myDex/theirDex) * (myAgl/theirAgl) * myArmor;
	//		curHitpoints -= appliedDamage * Time.deltaTime;
	//	}
	
	public function onHpChange( before : float, after : float ) {
	}
}