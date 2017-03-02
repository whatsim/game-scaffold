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

	var age = 0
	this.update = function(){

		this.x += this.velocity.x
		this.y += this.velocity.y

		this.heading = Math.atan2(this.velocity.y,this.velocity.x)
		return age++
	}
	this.draw = function(time,drawContext){
		drawContext.save()
		drawContext.translate(this.x,this.y)
		drawContext.rotate(this.heading)
		drawContext.strokeStyle = "#9EB9D4"
		drawContext.beginPath()
		drawContext.moveTo(0,0)
		drawContext.lineTo(10,0)
		drawContext.closePath()
		drawContext.stroke()
		drawContext.restore()
	}
}