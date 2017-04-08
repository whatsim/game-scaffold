function Projectile(options){
	//options
	//x,y,speed,heading
	this.x = options.x
	this.y = options.y
	this.speed = options.speed
	this.heading = options.heading + Math.PI/2
	this.maxAge = options.maxAge

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
		var a = (1 - (this.age / this.maxAge))
		drawContext.save()
		drawContext.translate(this.x,this.y)
		drawContext.rotate(this.heading)
		drawContext.strokeStyle = "rgba(158,185,212,"+a+")"
		drawContext.beginPath()
		var mag = Utils.pythagoreanHypo(this.velocity.x,this.velocity.y)
		drawContext.moveTo(-mag+1,0)
		drawContext.lineTo(0,0)
		drawContext.closePath()
		drawContext.stroke()
		drawContext.restore()
	}
}