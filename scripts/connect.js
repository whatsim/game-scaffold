function Connect(options){
	var pc = new RTCPeerConnection();
	
	var isHost = window.location.hash === '#host'
	var dc = pc.createDataChannel('aaa');
	
	var out = ""

	pc.onicecandidate = e => {
		!e.candidate || console.log(out + "=!=!=!=" + JSON.stringify(e.candidate))
    }

    if(isHost){
		pc.createOffer()
	    .then(offer => {
	    	out += JSON.stringify(offer)
	    	pc.setLocalDescription(offer)
	    })
	    .then(giveAnswer)
	    .then(answer => pc.setRemoteDescription(answer))
	} else {
		giveAnswer().then(function(offer){pc.setRemoteDescription(offer)})
		.then(() => pc.createAnswer())
		.then(answer => {
			out += JSON.stringify(answer)
			pc.setLocalDescription(answer)
		})
	}

	dc.onmessage = function (event) {
	  console.log("received: " + event.data);
	};

	dc.onopen = function () {
	  console.log(dc)
	  console.log("datachannel open");
	};

	dc.onclose = function () {
	  console.log("datachannel close");
	};
	
	function giveAnswer(){
		var p = new Promise(function(resolve,reject){
			answer = function(str){				
				var split = str.split("=!=!=!=")
				resolve(JSON.parse(split[0].replace(/\r\n/g,"\\r\\n")))
				setTimeout(function(){
					pc.addIceCandidate(JSON.parse(split[1]))
				})
			}
		})
		
		return p
	}
	
}