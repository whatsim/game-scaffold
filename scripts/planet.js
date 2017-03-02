function Planet(bullets,player,options){
	// options
	// x,y,radius,mass,color
	this.x = options.x
	this.y = options.y
	this.radius = options.radius
	this.mass = options.mass
	this.color = options.color
	
	
	this.update = function(){
		
		for(var i = 0; i < bullets.length; i++) pull(bullets[i])
	}
	this.draw = function(time,drawContext){
		drawContext.save()
		drawContext.translate(this.x,this.y)
		drawContext.fillStyle = this.color
		drawContext.beginPath()
		drawContext.ellipse(0,0,this.radius,this.radius,0,2*Math.PI,false)
		drawContext.fill()
		drawContext.closePath()
		drawContext.restore()
	}

	var pull = (object) => {
		var distance = Utils.distance(this,object)
		var force = this.mass/distance
		var angle = Math.atan2(this.x - object.x,this.y - object.y)
		object.velocity.x += Math.sin(angle)
		object.velocity.y += Math.cos(angle)
	}

}
