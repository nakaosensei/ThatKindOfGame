
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