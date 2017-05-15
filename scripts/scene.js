function Scene(options){
	// update,draw
	
	var properties = {}

	var update = function(){
		if(options && options.update) options.update()
		for(var i = 0; i < children.length; i++) children[i].update()
	}
	
	var draw = function(time,drawContext){
		if(options && options.update) options.draw(time,drawContext)
		for(var i = 0; i < children.length; i++) children[i].draw(time,drawContext)
	}

	var children = []

	return {
		update : update,
		draw : draw,
		children : children,
		properties : properties
	}
}