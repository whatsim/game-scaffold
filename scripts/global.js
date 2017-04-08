(function(){
	
	var player = new Player({
		id:0,
		x:100, y:100,
		color:"#6495ED"
	})
	
	console.log(player)

	var ui = new UI(player)
	
	var bullets = []
	var planets = []

	var mode = "running"

	var gameOptions = {
		rendererID: 'renderer',
		init : function(){

			var connection = new Connect()

			console.log(connection)

			planets.push(new Planet(bullets,player,{
				x:window.innerWidth/3,
				y:window.innerHeight/2,
				radius:60,
				mass:12000,
				color:'#DB7093'
			}))		

			planets.push(new Planet(bullets,player,{
				x:window.innerWidth/2,
				y:window.innerHeight/2,
				radius:10,
				mass:-1000,
				color:'skyblue'
			}))		

			planets.push(new Planet(bullets,player,{
				x:2*window.innerWidth/3,
				y:window.innerHeight/2,
				radius:60,
				mass:12000,
				color:'#DB7093'
			}))		
		}, 
		update : function(){
			if(mode === 'running'){
				Inputs.pollControllers()

				player.update(bullets)
				for(var i = 0; i < planets.length; i++) planets[i].update()
				for(var i = bullets.length-1; i >= 0; i--){
					var age = bullets[i].update()
					if(age > bullets[i].maxAge) bullets.splice(i,1)
				}
				ui.update()
			} else {

			}
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