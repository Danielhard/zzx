var play_state = {
    create: function() { 
		//载入所需资源
		this.bg = this.game.add.sprite(0,0,'bg');
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this); 
        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');  
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);           
        this.mooncake = this.game.add.sprite(100, 245, 'mooncake');
        this.mooncake.body.gravity.y = 1000; 		//设置月饼重力属性,gravity
        this.mooncake.anchor.setTo(-0.2, 0.5);		//设置月饼重心
        score = 0;
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style); 

        this.jump_sound = this.game.add.audio('jump');		//加载音效
		this.dead_sound = this.game.add.audio('dead');		//||
    },
    update: function() {
        if (this.mooncake.inWorld == false)
            this.restart_game(); 
        if (this.mooncake.angle < 20)
            this.mooncake.angle += 1;
        this.game.physics.overlap(this.mooncake, this.pipes, this.hit_pipe, null, this);
    },
	//每次按下空格调用的函数
    jump: function() {
        if (this.mooncake.alive == false)
            return; 
        this.mooncake.body.velocity.y = -350;
        this.game.add.tween(this.mooncake).to({angle: -20}, 50).start();
        this.jump_sound.play();
    },
	//bump
    hit_pipe: function() {
        if (this.mooncake.alive == false)
            return;
        this.mooncake.alive = false;
        this.game.time.events.remove(this.timer);
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
		this.dead_sound.play();
    },
	//重新开始函数
    restart_game: function() {
        this.game.time.events.remove(this.timer);
		
        this.game.state.start('gameover');
    },

    add_one_pipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x, y);
        pipe.body.velocity.x = -200; 
        pipe.outOfBoundsKill = true;
    },

    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*5)+1;
        
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1) 
                this.add_one_pipe(400, i*60+10);   
        score += 1; 
        this.label_score.content = score;  
    },
};