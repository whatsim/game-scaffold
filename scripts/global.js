(function(){
	
	var player = new Player({
		id:0,
		x:100, y:100,
		color:"#6495ED"
	})
	
	var ui = new UI(player)
	
	var bullets = []
	var planets = []

	var audioOut = new Sound()

	var highBeep = {
		frequency : 440,
		wave : 'triangle',
		gain:0.2,
		duration:1/440 * 10
	}
	
	var lowBeep = {
		frequency : 120,
		wave : 'square',
		gain:0.1,
		duration:1/120 * 10
	}

	var gameOptions = {
		rendererID: 'renderer',
		init : function(){

			var connection = new Connect()

			planets.push(new Planet(bullets,player,{
				x:window.innerWidth/3,
				y:window.innerHeight/2,
				radius:60,
				mass:100,
				color:'#DB7093'
			}))		

			planets.push(new Planet(bullets,player,{
				x:window.innerWidth/2,
				y:window.innerHeight/2,
				radius:10,
				mass:-25,
				color:'skyblue'
			}))		

			planets.push(new Planet(bullets,player,{
				x:2*window.innerWidth/3,
				y:window.innerHeight/2,
				radius:60,
				mass:100,
				color:'#DB7093'
			}))		
		}, 
		update : function(){
			player.update(bullets)
			for(var i = 0; i < planets.length; i++) planets[i].update()
			for(var i = bullets.length-1; i >= 0; i--){
				var age = bullets[i].update()
				// audio stuff probably shouldn't be triggered here
				if(age < 1) audioOut.beep(highBeep)
				if(age > 500){
					if(age > 10000){
						audioOut.beep(lowBeep)
					}
					bullets.splice(i,1)
				}
			}
			ui.update()
		},
		draw : function(time,context){
			for(var i = 0; i < planets.length; i++) planets[i].draw(time,context)
			player.draw(time,context)
			for(var i = 0; i < bullets.length; i++) bullets[i].draw(time,context)
			
			ui.draw(time,context)
		}
	}

	var game = new Game(gameOptions)

})()