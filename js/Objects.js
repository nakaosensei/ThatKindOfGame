class Spike extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'spike')   
        this.anchor.setTo(0.5, 0.5);        
        this.player = player;
        this.typeEnemy="OBJ";        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.body.immovable = true;
        this.body.moves = false;
    }

    update() {
        this.game.physics.arcade.collide(this, this.player,this.player.takeHit);
        this.player.hit=1;
    }
    destroyItself(skill,victim){
        victim.destroy();
        skill.destroy();
    }
}
class Spike2 extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'spike2')   
        this.anchor.setTo(0.5, 0.5);        
        this.player = player;
        this.typeEnemy="OBJ";        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.body.immovable = true;
        this.body.moves = false;
    }

    update() {
        this.game.physics.arcade.collide(this, this.player,this.player.takeHit);
        this.player.hit=1;
    }
    destroyItself(skill,victim){
        victim.destroy();
        skill.destroy();
    }
}
class DarkHole extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'darkHole')   
        this.anchor.setTo(0.5, 0.5);        
        this.player = player;
        this.typeEnemy="OBJ";        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.animations.add('default',[0,1,2,3],10,true);  
        this.animations.play('default');
        this.game.add.existing(this);
        this.body.immovable = true;
        this.body.moves = false;
        this.pushCount=200;
    }

    update() {
        if(this.player.x>this.x||this.pushCount<=0){
            return
        }
        if(this.y>this.player.y && this.x-this.player.x<300){
            this.player.y+=2;
            this.pushCount--;
        }else if(this.y<this.player.y && this.x-this.player.x<300){
            this.player.y-=2;
            this.pushCount--;
        }
        
        this.game.physics.arcade.collide(this, this.player,this.player.takeHit);
        this.player.hit=1;
    }
    destroyItself(skill,victim){
        victim.destroy();
        skill.destroy();
    }
}
class Meteor extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'meteor')   
        this.anchor.setTo(0.5, 0.5);        
        this.player = player;
        this.typeEnemy="OBJ";        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.falling=0;
        this.body.immovable = true;
        this.animations.add('default',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],this.speed,true);
        this.animations.play('default');
        this.body.setSize(100,130,50,50)
        //this.body.moves = false;
    }

    update() {
        this.game.physics.arcade.collide(this, this.player,this.player.takeHit);
        this.player.hit=1;
        if(this.falling==0){
            this.y+=3;
        }
        //if(this.x-this.player.x<200&&this.falling==0){
        //    this.y+=5;
        //    this.falling=1;
        //}
        if(this.game!=null&&this.y>this.game.height){
            this.y=0;
        }
    }
    destroyItself(skill,victim){
        victim.destroy();
        skill.destroy();
    }
}
class Portal extends Phaser.Sprite {
    constructor(game, x, y,player,state,gameSound) {
        super(game, x, y, 'portal')   
        this.anchor.setTo(0.5, 0.5);        
        this.player = player;
        this.typeEnemy="OBJ";        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.body.immovable = true;
        this.nextState = state;
        this.body.moves = false;
        this.gameSound=gameSound;
        this.animations.add('default',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],this.speed,true);
        this.animations.play('default');
    }

    update() {
        this.game.physics.arcade.collide(this, this.player,this.goToNextStage);        
    }
    destroyItself(skill,victim){
        victim.destroy();
        skill.destroy();
    }
    goToNextStage(source,victim){
        source.gameSound.stop();
        source.game.state.start(source.nextState);
    }
}
class Portal2 extends Phaser.Sprite {
    constructor(game, x, y,player,state,gameSound) {
        super(game, x, y, 'portal')   
        this.anchor.setTo(0.5, 0.5);        
        this.player = player;
        this.typeEnemy="OBJ";        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.body.immovable = true;
        this.nextState = state;
        this.body.moves = false;
        this.gameSound=gameSound;
        this.tint = 0xff0000;
        this.body.setSize(50,150,30,35)
        this.animations.add('default',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],this.speed,true);
        this.animations.play('default');
    }

    update() {
        this.game.physics.arcade.collide(this, this.player,this.goToNextStage);        
    }
    destroyItself(skill,victim){
        victim.destroy();
        skill.destroy();
    }
    goToNextStage(source,victim){
        source.gameSound.stop();
        source.game.state.start(source.nextState);
    }
}
