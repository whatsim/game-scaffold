function Player(id,x,y,color){
	this.id = id
	this.x = x
	this.y = y
	this.color = color
	this.inventory = {}
	this.speed = 3
	this.heading = 0

	var bullets = []

	this.update = function(){
		var speed = this.speed

		this.heading = Math.PI - Math.atan2(this.x - Inputs[Settings.mouse.x],this.y - Inputs[Settings.mouse.y])

		if(Inputs[Settings.controls.up]) this.y -= speed
		if(Inputs[Settings.controls.down]) this.y += speed
		if(Inputs[Settings.controls.left]) this.x -= speed
		if(Inputs[Settings.controls.right]) this.x += speed

		if(Inputs[Settings.mouse.down]) bullets.push(new Projectile(this.x,this.y,10,this.heading))

		for(var i = bullets.length-1; i >= 0; i--){
			var age = bullets[i].update()
			if(age > 100) bullets.splice(i,1)
		}
	}
	this.draw = function(time,drawContext){
		drawContext.save()
		drawContext.translate(this.x,this.y)
		drawContext.rotate(this.heading)
		drawContext.fillStyle = this.color
		drawContext.beginPath()
		drawContext.moveTo(0,5)
		drawContext.lineTo(-5,-5)
		drawContext.lineTo(5,-5)
		drawContext.lineTo(0,5)
		drawContext.closePath()
		drawContext.fill()
		drawContext.restore()

		for(var i = 0; i < bullets.length; i++) bullets[i].draw(time,drawContext)
	}
}
