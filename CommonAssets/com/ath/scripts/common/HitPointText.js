#pragma strict

@script RequireComponent(GUIText)

class HitPointText extends BaseMonoBehavior {
	
	public var character : TakesDamage;
	public var refreshRateSeconds : float = 0.5;
	
	private var gtext : GUIText;
	private var timer : Timer;
	
	public function onStart () {
		super.onStart();
		gtext = this.GetComponent(GUIText);
		timer = new Timer();
	}
	
	public function onUpdate() {
		super.onUpdate();
		if ( timer.wait( refreshRateSeconds ) ) {
			gtext.text = character.getHp().ToString();
		}
	}
	
}