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
		drawContext.strokeStyle = "#fffacd"
		drawContext.strokeWidth = 2
		drawContext.beginPath()
		drawContext.moveTo(0,-cursorLength)
		drawContext.lineTo(0,0)
		drawContext.closePath()
		drawContext.stroke()
		drawContext.restore()

		// ammo
		drawContext.save()
		drawContext.translate(player.x,player.y)
		drawContext.rotate(player.heading)
		drawContext.translate(0,-75)
		drawContext.rotate(-player.heading)
		drawContext.fillStyle = "#9EB9D4"
		drawContext.fillRect(-25,-2,50,4)
		drawContext.fillStyle = "white"
		drawContext.textAlign = "center"
		drawContext.font = "6pt Courier"
		drawContext.fillText(player.inventory.ammo,0,-8)
		if(player.health < 33) drawContext.fillStyle = "#DB7093"
		drawContext.fillRect(-25,-2,player.health/2,4)

		drawContext.restore()
	}
}
