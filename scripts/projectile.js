function Projectile(x,y,speed,heading){
	this.x = x
	this.y = y
	this.speed = speed
	this.heading = heading + Math.PI/2
	var age = 0
	this.update = function(){
		var xMove = Math.cos(this.heading) * this.speed
		var yMove = Math.sin(this.heading) * this.speed
		this.x += xMove
		this.y += yMove
		return age++
	}
	this.draw = function(time,drawContext){
		drawContext.save()
		drawContext.translate(this.x,this.y)
		drawContext.rotate(this.heading)
		drawContext.strokeStyle = "#9EB9D4"
		drawContext.beginPath()
		drawContext.moveTo(0,0)
		drawContext.lineTo(5,0)
		drawContext.closePath()
		drawContext.stroke()
		drawContext.restore()
	}
}