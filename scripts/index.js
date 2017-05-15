(function(){
	
	var scene, player, ui
	
	var gameOptions = {
		rendererID: 'renderer',
		init : function(){

			scene = new Scene()

	 		player = new Player({
				id:0,
				x:100, y:100
			})

	 		ui = new UI(player)

			scene.children.push(player)
			scene.children.push(ui)
			
		}, 
		update : function(){
			scene.update()
		},
		draw : function(time,context){
			scene.draw(time,context)
		}
	}

	var game = new Game(gameOptions)

})()