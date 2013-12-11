#pragma strict

@script RequireComponent( AudioSource );
@script RequireComponent( Collider );

public var minSoundMag : double = 0.1;
public var maxSoundMag : double = 10.0; 

function OnCollisionEnter ( collision : Collision ) {
	var mag : double = collision.relativeVelocity.magnitude;
	var audioMag : double = 0;	
	if ( mag < minSoundMag ) {
		return;
	}
	
	audioMag = mag / (maxSoundMag - minSoundMag);
	if ( audioMag > 1 ) {
		audioMag = 1;
	}

	audio.PlayOneShot( audio.clip, audioMag );
}
