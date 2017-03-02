var Utils = (function(){
	function lerp(ratio, start, end){
        return start + (end - start) * ratio;
    }
    function pythagoreanHypo(a,b){
    	return Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
    }
    function distance(p1,p2){
    	return pythagoreanHypo(p1.x - p2.x,p1.y - p2.y)
    }

	return {
		lerp : lerp,
		pythagoreanHypo : pythagoreanHypo,
		distance: distance
	}
})()