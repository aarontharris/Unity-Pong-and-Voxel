public class Message extends BaseSystemObject {
	public var key : String;
	public var data : Object;

	public function Message( key : String, data : Object ) {
		this.key = key;
		this.data = data;
	}
}