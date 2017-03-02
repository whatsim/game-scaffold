function Player(options){
	// id,x,y,color
	this.id = options.id
	this.x = options.x
	this.y = options.y
	this.color = options.color
	this.inventory = {
		ammo:10000,
		items : {

		}
	}
	this.velocity = {
		x:0,
		y:0
	}
	this.speed = 5
	this.heading = 0
	this.health = 75
	this.weaponCooldown = 5

	var gunReady = 0

	this.update = function(bullets){
		var speed = this.speed

		this.heading = Math.PI - Math.atan2(this.x - Inputs[Settings.mouse.x],this.y - Inputs[Settings.mouse.y])

		if(Inputs[Settings.controls.up]) this.velocity.y = -speed
		if(Inputs[Settings.controls.down]) this.velocity.y = speed
		if(Inputs[Settings.controls.left]) this.velocity.x = -speed
		if(Inputs[Settings.controls.right]) this.velocity.x = speed

		this.x += this.velocity.x
		this.y += this.velocity.y

		this.velocity.x *= 0.85
		this.velocity.y *= 0.85

		if(Inputs[Settings.mouse.down]){
			if(this.inventory.ammo > 0 && gunReady == 0){
				bullets.push(new Projectile({
					x:this.x,
					y:this.y,
					speed:12,
					heading:this.heading
				}))
				this.inventory.ammo --
				gunReady = this.weaponCooldown
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
		drawContext.moveTo(0,7)
		drawContext.lineTo(-6,-7)
		drawContext.lineTo(6,-7)
		drawContext.lineTo(0,7)
		drawContext.closePath()
		drawContext.fill()
		drawContext.restore()
	}
}
