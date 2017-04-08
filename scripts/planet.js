function Planet(bullets,player,options){
	// options
	// x,y,radius,mass,color
	this.x = options.x
	this.y = options.y
	this.radius = options.radius
	this.mass = options.mass
	this.color = options.color
	
	this.update = function(){
		
		for(var i = 0; i < bullets.length; i++){
			pull(bullets[i])
			var testPos = {
				x:bullets[i].x + bullets[i].velocity.x,
				y:bullets[i].y + bullets[i].velocity.y
			}
			var distance = Utils.distance(this,testPos)
			if(distance < this.radius) bullets[i].age = 10000000
		}
	}
	this.draw = function(time,drawContext){
		drawContext.save()
		drawContext.translate(this.x,this.y)
		drawContext.fillStyle = this.color
		drawContext.strokeStyle = this.color
		drawContext.beginPath()
		drawContext.ellipse(0,0,this.radius,this.radius,0,2*Math.PI,false)
		if(this.mass > 0) drawContext.fill()
		else drawContext.stroke()
		drawContext.closePath()
		drawContext.restore()
	}

	var pull = (object) => {
		var distance = Utils.distance(this,object)
		var force = this.mass/(distance*distance)
		var angle = Math.atan2(this.x - object.x,this.y - object.y)
		object.velocity.x += force*Math.sin(angle)
		object.velocity.y += force*Math.cos(angle)
	}

}
