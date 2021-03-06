var Inputs = (function(){
	var inputState = {}

	window.addEventListener('keydown',readKeys)
	window.addEventListener('keyup',readKeys)

	window.addEventListener('mousedown',readMouse)
	window.addEventListener('mousemove',readMouse)
	window.addEventListener('mouseup',readMouse)

	inputState.pollControllers = function(){
		var gamepads = navigator.getGamepads()
		inputState.controllers = gamepads
	}

	function readKeys(e){
		e.preventDefault()
		inputState[e.key] = e.type === 'keydown'
		return false
	}

	function readMouse(e){
		e.preventDefault()
		inputState['mouseX'] = e.clientX
		inputState['mouseY'] = e.clientY
		inputState['mouseDown'] = e.type == 'mousedown' ? true : e.type == 'mouseup' ? false : inputState['mouseDown']
		return false
	}

	return inputState
})()