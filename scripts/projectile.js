function Projectile(options){
	//options
	//x,y,speed,heading
	this.x = options.x
	this.y = options.y
	this.speed = options.speed
	this.heading = options.heading + Math.PI/2

	this.velocity = {
		x:Math.cos(this.heading) * this.speed,
		y:Math.sin(this.heading) * this.speed
	}

	this.age = 0
	this.update = function(){

		this.x += this.velocity.x
		this.y += this.velocity.y

		this.heading = Math.atan2(this.velocity.y,this.velocity.x)
		return this.age++
	}
	this.draw = function(time,drawContext){
		drawContext.save()
		drawContext.translate(this.x,this.y)
		drawContext.rotate(this.heading)
		drawContext.strokeStyle = "#9EB9D4"
		drawContext.beginPath()
		var mag = Utils.pythagoreanHypo(this.velocity.x,this.velocity.y)
		drawContext.moveTo(-mag+1,0)
		drawContext.lineTo(0,0)
		drawContext.closePath()
		drawContext.stroke()
		drawContext.restore()
	}
}