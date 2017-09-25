var ready_state = {
	create:function(){
		//ready-state
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.start,this);
		this.bg = this.game.add.sprite(0,0,'bg');
		this.ready = this.game.add.sprite(0,0,'ready');
		this.mooncake = this.game.add.sprite(100,245,'mooncake');
	},
	start:function(){
		this.game.state.start('play');	
	},
};