(function(){
	var _needsDraw = true
	var player = new Player(0,0,0,"red")
	var ui = new UI()
	var _renderer, _context

	function _init(){
		 _renderer = document.getElementById('renderer')
		_context = _renderer.getContext('2d')
		_viewResize()
		window.setInterval(_update,33) // logic 30 fps-ish
		window.requestAnimationFrame(_draw) // probably 60 fps
	}

	function _update(){
		player.update()
		ui.update(player)
		_needsDraw = true
	}

	function _draw(time){
		if(_needsDraw){
			_renderer.width = _renderer.width
			var context = _renderer.getContext('2d')

			player.draw(time,context)
			ui.draw(time,context)

		}
		_needsDraw = false
		window.requestAnimationFrame(_draw)
	}

	function _viewResize(){
		_renderer.width = window.innerWidth
		_renderer.height = window.innerHeight
	}

	window.addEventListener('load',_init)
	window.addEventListener('resize',_viewResize)
})()