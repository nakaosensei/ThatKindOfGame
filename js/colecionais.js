class Life extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'lifeSingle')   
        this.anchor.setTo(0.5, 0.5);        
        this.player = player;
        this.typeEnemy="OBJ";        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.body.immovable = true;
        this.body.moves = false;
    }

    update() {
        this.game.physics.arcade.collide(this, this.player,this.player.gainLife);
        this.player.hit=1;
    }
    destroyItself(skill,victim){
        victim.destroy();
        skill.destroy();
    }
}
class MunitionBlue extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'munition')   
        this.anchor.setTo(0.5, 0.5);        
        this.player = player;
        this.typeEnemy="OBJ";        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.body.immovable = true;
        this.body.moves = false;
    }

    update() {
        this.game.physics.arcade.collide(this, this.player,this.player.addShot);
        this.player.hit=1;
    }
    destroyItself(skill,victim){
        victim.destroy();
        skill.destroy();
    }
}