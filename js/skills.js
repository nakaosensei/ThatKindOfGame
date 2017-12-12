
class Darkball extends Phaser.Sprite {
    constructor(game, x, y, asset,vetorDefault,speed,enemy1,enemy2,enemy3) {
        super(game, x, y, asset)   
        this.anchor.setTo(0.5, 0.5)
        this.inputEnabled = true
        //this.input.enableDrag(false, true)        
        this.vetorDefault = vetorDefault
        this.speed = speed //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.moveSpeed = 18000;
        this.moveRange=10000;
        this.tint = 0x000000;
        this.enemy1=enemy1;
        this.enemy2=enemy2;
        this.enemy3=enemy3;
        this.anchor.setTo(0, 0);       
        this.game.physics.arcade.enable(this);
        this.body.moveTo(this.moveSpeed,this.moveRange,Phaser.ANGLE_RIGHT);
    }

    update() {
        this.game.physics.arcade.collide(this, this.enemy1,this.enemy1.destroyItself);
        this.game.physics.arcade.collide(this, this.enemy2,this.enemy2.destroyItself);
        this.game.physics.arcade.collide(this, this.enemy3,this.enemy3.destroyItself);
        this.player.hit=1;
    }
}

class Blueball extends Phaser.Sprite {
    constructor(game, x, y, asset,vetorDefault,speed,characterCtrl,player,munitionText) {        
        super(game, x, y, asset)   
        this.anchor.setTo(0.5, 0.5)
        this.inputEnabled = true

        //this.input.enableDrag(false, true)        
        this.vetorDefault = vetorDefault;
        this.game=game;
        this.speed = speed //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.moveSpeed = 24000;
        this.moveRange=20000;
        this.characterCtrl=characterCtrl;
        this.creationTime = this.game.time.now;
        this.anchor.setTo(0, 0);
        this.game.physics.arcade.enable(this);
        this.body.moveTo(this.moveSpeed,this.moveRange,Phaser.ANGLE_RIGHT);
        this.player = player
        this.munitionText=munitionText        
        this.player.municao-=1;
        this.munitionText.text = ''+this.player.municao;        
        this.munitionText = munitionText        
        this.soundEff = this.game.add.audio('blueFlameSound');
        this.soundEff.play();
        this.game.add.existing(this)        
    }

    update() {        
        var i = 0;        
        for(i=0;i<this.characterCtrl.personagens.length;i++){
            if(this.characterCtrl.personagens[i]!=null&&this.game!=null){
                this.game.physics.arcade.collide(this, this.characterCtrl.personagens[i],this.characterCtrl.personagens[i].destroyItself);    
            }                            
        }            
        if(this.game!=null&&this.game.time.now-this.creationTime>3000){
            this.destroy();
        }        
    }
}

class Bloodball extends Phaser.Sprite {
    constructor(game, x, y, asset,vetorDefault,speed,enemy1,enemy2,enemy3) {
        super(game, x, y, asset)   
        this.anchor.setTo(0.5, 0.5)
        this.inputEnabled = true
        //this.input.enableDrag(false, true)        
        this.vetorDefault = vetorDefault
        this.speed = speed //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.moveSpeed = 18000;
        this.moveRange=10000;
        this.tint = 0xff0000;
        this.enemy1=enemy1;
        this.enemy2=enemy2;
        this.enemy3=enemy3;
        this.anchor.setTo(0, 0);       
        this.game.physics.arcade.enable(this);
        this.body.moveTo(this.moveSpeed,this.moveRange,Phaser.ANGLE_RIGHT);
    }

    update() {
        this.game.physics.arcade.collide(this, this.enemy1,this.enemy1.destroyItself);
        this.game.physics.arcade.collide(this, this.enemy2,this.enemy2.destroyItself);
        this.game.physics.arcade.collide(this, this.enemy3,this.enemy3.destroyItself);
        this.player.hit=1;
    }
}
