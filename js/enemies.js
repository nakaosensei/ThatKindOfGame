
class Phoenix extends Phaser.Sprite {
    constructor(game, x, y,player,skillCtr) {
        super(game, x, y, 'phoenix')   
        this.anchor.setTo(0.5, 0.5)
        this.vetorDefault = [4,5,6,7]
        this.speed = 5 //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.typeEnemy="MOB"
        this.player = player;      
        this.skillCtrl = skillCtr;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.creationTime=this.game.time.now
        this.body.setSize(100,80,20,50) 
        //this.fireBlast = new FireBlast(this.game,this.x,this.y,this.player);
        //this.body.moveTo(10000,2000,Phaser.ANGLE_LEFT);     
    }

    update() {
        if(this.game==null){
            return 0;
        }
        if(this.game.time.now-this.creationTime>5000){
            this.fireBlast = new FireBlast(this.game,this.x,this.y,this.player);
            this.creationTime=this.game.time.now
            this.skillCtrl.add(this.fireBlast)
        }
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
        this.typeEnemy="MOB"
        this.vetorDefault = [0,1,2,3]
        this.speed = 5 //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.player = player;      
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.body.setSize(80,40,20,60) 
        //this.body.moveTo(10000,2000,Phaser.ANGLE_LEFT);     
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

class FireBlast extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'fireBlast')   
        this.anchor.setTo(0.5, 0.5)
        this.typeEnemy="MOB"
        this.vetorDefault = [0]
        this.speed = 5 //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.player = player;      
        this.game.physics.enable(this, Phaser.Physics.ARCADE);        
        //this.body.moveTo(2000,5000,Phaser.ANGLE_LEFT);
        this.game.add.existing(this);     
        this.creationTime=this.game.time.now
    }

    update() {
        this.x-=5;
        this.game.physics.arcade.collide(this, this.player,this.player.takeHit);
        this.player.hit=1;
        if(this.game!=null&&this.game.time.now-this.creationTime>4000){
            this.destroy();
        }
    }
    destroyItself(skill,victim){
        victim.destroy();
        skill.destroy();
    }
    
}