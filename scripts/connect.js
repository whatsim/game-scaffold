function Connect(options){
	var pc = new RTCPeerConnection();
	
	var isHost = window.location.hash === '#host'
	if(isHost){
		var dc = pc.createDataChannel('a'+Math.random());
		dc.onmessage = handleReceiveMessage

		dc.onopen = function () {
		  console.log(dc)
		  console.log("datachannel open");
		};

	} else {
		pc.ondatachannel = function(e){
			console.log(e.channel)
		    e.channel.onmessage = handleReceiveMessage;
		}
	}
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

	function handleReceiveMessage(event){
		console.log("received: " + event.data);
	}
	
	function giveAnswer(){
		var p = new Promise(function(resolve,reject){
			answer = function(str){				
				var split = str.split("=!=!=!=")
				
				var session = JSON.parse(split[0].replace(/\r\n/g,"\\r\\n"))
				resolve(new RTCSessionDescription(session))
				
				setTimeout(function(){
					pc.addIceCandidate(new RTCIceCandidate(JSON.parse(split[1])))
				})
			
			}
		})
		
		return p
	}
	
}