(function(){
	var _needsDraw = true
	var player = new Player(0,100,100,"#6495ED")
	var ui = new UI()
	var _renderer, _context

	var bullets = []

	function _init(){
		 _renderer = document.getElementById('renderer')
		_context = _renderer.getContext('2d')
		_viewResize()
		window.setInterval(_update,33) // logic 30 fps-ish
		window.requestAnimationFrame(_draw) // probably 60 fps
	}

	function _update(){
		player.update(bullets)

		for(var i = bullets.length-1; i >= 0; i--){
			var age = bullets[i].update()
			if(age > 100) bullets.splice(i,1)
		}

		ui.update(player)
		_needsDraw = true
	}

	function _draw(time){
		if(_needsDraw){
			_renderer.width = _renderer.width
			var context = _renderer.getContext('2d')

			player.draw(time,context)
			for(var i = 0; i < bullets.length; i++) bullets[i].draw(time,context)
			
			ui.draw(time,context)
			_needsDraw = false
		}
		window.requestAnimationFrame(_draw)
	}

	function _viewResize(){
		_renderer.width = window.innerWidth
		_renderer.height = window.innerHeight
	}

	window.addEventListener('load',_init)
	window.addEventListener('resize',_viewResize)
})()