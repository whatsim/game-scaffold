function UI(player){
	
	var distanceToCursor = 0

	this.update = function(){
		distanceToCursor = Utils.distance({x:Inputs[Settings.mouse.x],y:Inputs[Settings.mouse.y]},player)
	}
	this.draw = function(time,drawContext){

		var ratio = distanceToCursor / (window.innerWidth / 2)
		var cursorLength = Utils.lerp(ratio * ratio,5,50)

		// cursor
		drawContext.save()
		drawContext.translate(Inputs[Settings.mouse.x],Inputs[Settings.mouse.y])
		drawContext.rotate(player.heading)
		drawContext.strokeStyle = "white"
		drawContext.strokeWidth = 2
		drawContext.beginPath()
		drawContext.moveTo(0,-cursorLength)
		drawContext.lineTo(0,0)
		drawContext.closePath()
		drawContext.stroke()
		drawContext.restore()

	}
}
