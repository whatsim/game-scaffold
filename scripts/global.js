(function(){
	
	var player = new Player({
		id:0,
		x:100, y:100,
		color:"#6495ED"
	})
	
	var ui = new UI(player)
	
	var bullets = []
	var planets = []

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
				if(age > 500) bullets.splice(i,1)
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