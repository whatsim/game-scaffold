function UI(){
	var playerHeading = 0
	var distanceToCursor = 0
	this.update = function(player){
		playerHeading = player.heading
		distanceToCursor = Math.sqrt(Math.pow(Inputs[Settings.mouse.x] - player.x,2) + Math.pow(Inputs[Settings.mouse.y] - player.y,2))
	}
	this.draw = function(time,drawContext){

		var ratio = distanceToCursor / (window.innerWidth / 2)
		var cursorLength = Utils.lerp(ratio * ratio,5,50)

		drawContext.save()
		drawContext.translate(Inputs[Settings.mouse.x],Inputs[Settings.mouse.y])
		drawContext.rotate(playerHeading)
		drawContext.strokeStyle = "#fffacd"
		drawContext.beginPath()
		drawContext.moveTo(0,cursorLength)
		drawContext.lineTo(0,0)
		drawContext.closePath()
		drawContext.stroke()
		drawContext.restore()
	}
}
