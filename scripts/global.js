(function(){
	var _needsDraw = true
	var player = new Player({
		id:0,
		x:100, y:100,
		color:"#6495ED"
	})
	console.log(player)
	var ui = new UI(player)
	var _renderer, _context

	var bullets = []
	var planets = []

	function _init(){
		 _renderer = document.getElementById('renderer')
		_context = _renderer.getContext('2d')
		_viewResize()

		planets.push(new Planet(bullets,player,{
			x:window.innerWidth/3,
			y:window.innerHeight/2,
			radius:60,
			mass:100,
			color:'#DB7093'
		}))		

		planets.push(new Planet(bullets,player,{
			x:2*window.innerWidth/3,
			y:window.innerHeight/2,
			radius:60,
			mass:100,
			color:'#DB7093'
		}))		


		window.setInterval(_update,33) // logic 30 fps-ish
		window.requestAnimationFrame(_draw) // probably 60 fps
	}

	function _update(){
		player.update(bullets)
		for(var i = 0; i < planets.length; i++) planets[i].update()
		for(var i = bullets.length-1; i >= 0; i--){
			var age = bullets[i].update()
			if(age > 500) bullets.splice(i,1)
		}

		

		ui.update()
		_needsDraw = true
	}

	function _draw(time){
		if(_needsDraw){
			_renderer.width = _renderer.width
			_context.scale(Settings.dpi,Settings.dpi)

			for(var i = 0; i < planets.length; i++) planets[i].draw(time,_context)
			player.draw(time,_context)
			for(var i = 0; i < bullets.length; i++) bullets[i].draw(time,_context)
			
			ui.draw(time,_context)
			_needsDraw = false
		}
		window.requestAnimationFrame(_draw)
	}

	function _viewResize(){
		_renderer.width = window.innerWidth * Settings.dpi
		_renderer.height = window.innerHeight * Settings.dpi
	}

	window.addEventListener('load',_init)
	window.addEventListener('resize',_viewResize)
})()