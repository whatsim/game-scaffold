function Connect(options){
	var pc = new RTCPeerConnection();
	
	var isHost = window.location.hash === '#host'
	var dc = pc.createDataChannel('aaa');
	
	pc.onicecandidate = e => {
		!e.candidate || console.log(JSON.stringify(e.candidate))
    }

    if(isHost){
		pc.createOffer()
	    .then(offer => {
	    	console.log(JSON.stringify(offer))
	    	pc.setLocalDescription(offer)
	    })
	    .then(giveAnswer)
	    .then(answer => pc.setRemoteDescription(answer))
	} else {
		giveAnswer().then(function(offer){pc.setRemoteDescription(offer)})
		.then(() => pc.createAnswer())
		.then(answer => {
			console.log(JSON.stringify(answer))
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
				resolve(JSON.parse(str.replace(/\r\n/g,"\\r\\n")))
			}
		})
		
		return p
	}
	giveCandidate = function(str){
		pc.addIceCandidate(JSON.parse(str))
	}
}