
class Phoenix extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'phoenix')   
        this.anchor.setTo(0.5, 0.5)
        this.vetorDefault = [4,5,6,7]
        this.speed = 5 //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.player = player;      
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.moveTo(10000,2000,Phaser.ANGLE_LEFT);     
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

class Owl extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'owl')   
        this.anchor.setTo(0.5, 0.5)
        this.vetorDefault = [0,1,2,3]
        this.speed = 5 //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.player = player;      
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.moveTo(10000,2000,Phaser.ANGLE_LEFT);     
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