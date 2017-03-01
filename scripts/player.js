function Player(id,x,y,color){
	this.id = id
	this.x = x
	this.y = y
	this.color = color
	this.inventory = {ammo:10000}
	this.speed = 5
	this.heading = 0
	this.health = 75

	var gunReady = 0

	this.update = function(bullets){
		var speed = this.speed

		this.heading = Math.PI - Math.atan2(this.x - Inputs[Settings.mouse.x],this.y - Inputs[Settings.mouse.y])

		if(Inputs[Settings.controls.up]) this.y -= speed
		if(Inputs[Settings.controls.down]) this.y += speed
		if(Inputs[Settings.controls.left]) this.x -= speed
		if(Inputs[Settings.controls.right]) this.x += speed

		if(Inputs[Settings.mouse.down]){
			if(this.inventory.ammo > 0 && gunReady == 0){
				bullets.push(new Projectile(this.x,this.y,10,this.heading))
				this.inventory.ammo --
				gunReady = 5
			}
		}
		if(gunReady > 0){
			if(!Inputs[Settings.mouse.down]){
				gunReady = 0
			} else {
				gunReady --
			}
		}
	}
	this.draw = function(time,drawContext){
		drawContext.save()
		drawContext.translate(this.x,this.y)
		drawContext.rotate(this.heading)
		drawContext.fillStyle = this.color
		drawContext.beginPath()
		drawContext.moveTo(0,5)
		drawContext.lineTo(-4,-5)
		drawContext.lineTo(4,-5)
		drawContext.lineTo(0,5)
		drawContext.closePath()
		drawContext.fill()
		drawContext.restore()
	}
}
