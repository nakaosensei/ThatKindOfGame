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
