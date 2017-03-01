var Utils = (function(){
	function lerp(ratio, start, end){
        return start + (end - start) * ratio;
    }

	return {
		lerp : lerp
	}
})()