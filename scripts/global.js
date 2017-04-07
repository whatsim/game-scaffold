(function(){
	
	var player, ui
	
	var gameOptions = {
		rendererID: 'renderer',
		init : function(){
	 		player = new Player({
				id:0,
				x:100, y:100
			})
			
			ui = new UI(player)
		}, 
		update : function(){
			player.update()
			ui.update()
		},
		draw : function(time,context){
			player.draw(time,context)
			ui.draw(time,context)
		}
	}

	var game = new Game(gameOptions)

})()