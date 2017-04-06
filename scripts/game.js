function Game(options){
	// rendererID, init, update, draw

	var _needsDraw = true
	var _renderer, _context

	var enviroment = {
		dpi : window.devicePixelRatio,
	}

	function _init(){
		 _renderer = document.getElementById(options.rendererID)
		_context = _renderer.getContext('2d')
		_viewResize()

		if(options.init) options.init()

		window.setInterval(_update,33) // logic 30 fps-ish
		window.requestAnimationFrame(_draw) // probably 60 fps
	}

	function _update(){
		if(options.update) options.update()
		_needsDraw = true
	}

	function _draw(time){
		if(_needsDraw){
			_renderer.width = _renderer.width
			_context.scale(enviroment.dpi,enviroment.dpi)

			if(options.draw) options.draw(time,_context)
			
			_needsDraw = false
		}
		window.requestAnimationFrame(_draw)
	}

	function _viewResize(){
		enviroment.dpi = window.devicePixelRatio
		_renderer.width = window.innerWidth * enviroment.dpi
		_renderer.height = window.innerHeight * enviroment.dpi
	}

	window.addEventListener('load',_init)
	window.addEventListener('resize',_viewResize)
}
