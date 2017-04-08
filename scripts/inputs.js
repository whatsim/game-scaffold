var Inputs = (function(){
	var inputState = {}

	window.addEventListener('keydown',readKeys)
	window.addEventListener('keyup',readKeys)

	window.addEventListener('mousedown',readMouse)
	window.addEventListener('mousemove',readMouse)
	window.addEventListener('mouseup',readMouse)

	window.addEventListener("gamepadconnected", controllerConnection)
	window.addEventListener("gamepaddisconnected", controllerConnection)

	function controllerConnection(e){
		inputState.controllersConnected = false
		var gamepads = navigator.getGamepads()
		var length = navigator.getGamepads().length
		for(var i = 0; i < length; i++){
			if(gamepads[i]) inputState.controllersConnected = true
		}
		inputState.controllers = gamepads
	}
	controllerConnection()

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