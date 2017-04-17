function Connect(options){
	var pc = new RTCPeerConnection();

	var exports = {
		dataChannel:undefined
	}
	
	var isHost = window.location.hash === '#host'
	if(isHost){
		var dc = pc.createDataChannel('a'+Math.random());

		dc.onopen = function () {
		  // have an open channel
		  exports.dataChannel = dc
		};

	} else {
		pc.ondatachannel = function(e){
			// have an open channel
			exports.dataChannel = e.channel
		}
	}
	var out = ""

	pc.onicecandidate = e => {
		!e.candidate || console.log("performManualConnection('" + out + "=!=!=!=" + JSON.stringify(e.candidate) + "')")
    }

    if(isHost){
		pc.createOffer().then(offer => {
	    	out += JSON.stringify(offer)
	    	pc.setLocalDescription(offer)
	    }).then(giveAnswer).then(answer => pc.setRemoteDescription(answer))
	} else {
		giveAnswer().then(function(offer){pc.setRemoteDescription(offer)}).then(() => pc.createAnswer()).then(answer => {
			out += JSON.stringify(answer)
			pc.setLocalDescription(answer)
		})
	}
	
	function giveAnswer(){
		var p = new Promise(function(resolve,reject){
			performManualConnection = function(str){				
				var split = str.split("=!=!=!=")
				
				var session = JSON.parse(split[0].replace(/\r\n/g,"\\r\\n"))
				resolve(new RTCSessionDescription(session))
				
				// raaacccyyy
				setTimeout(() => {
					pc.addIceCandidate(new RTCIceCandidate(JSON.parse(split[1])))
				})
				delete window.performManualConnection
			}
		})
		
		return p
	}
	return exports
}