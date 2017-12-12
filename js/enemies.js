class Boss extends Phaser.Sprite {
    constructor(game, x, y,player,skillCtr,characterCtrl) {
        super(game, x, y, 'boss')   
        this.anchor.setTo(0.5, 0.5)
        this.vetorDefault = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        this.speed = 5 //velocidade de troca dos sprites        
        this.typeEnemy="BOSS"
        this.control=1
        this.player = player;      
        this.skillCtrl = skillCtr;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.creationTime=this.game.time.now
        this.creationTime2=this.game.time.now
        this.body.setSize(100,100,0,10)
        this.characterCtrl = characterCtrl
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.createMob1=0;
        this.createMob2=0;
        this.body.immovable = true;
        
        //if(this.animations!=null){
            //this.animations.add('default',this.vetorDefault,this.speed,true);  
            //this.animations.play('default'); 
        //}
        
        //this.fireBlast = new FireBlast(this.game,this.x,this.y,this.player);
        //this.body.moveTo(10000,2000,Phaser.ANGLE_LEFT);     
    }

    update() {
        if(this.game==null){
            return 0;
        }        
        //this.x+=3;            


        if(this.game.time.now-this.creationTime2>3000){
            var owl = new Gargol(this.game, this.player.x+600,this.player.y,this.player);
            this.characterCtrl.add(owl); 
            this.creationTime2=this.game.time.now
        }

        if(this.game.time.now-this.creationTime>2000){
            this.fireBlast = new BloodBlast(this.game,this.x,this.y,this.player);
            this.creationTime=this.game.time.now
            this.skillCtrl.add(this.fireBlast)
            this.createMob1=1;
        }
        if(this.x-this.player.x>100&&this.y-this.player.y>100&&this.createMob1==1){
            var owl = new ShadowDemon(this.game, this.x,this.y,this.player);
            this.characterCtrl.add(owl); 
            this.createMob1=0;
        }        

        if(this.control<=160){
            this.x-=1;
            this.y=this.y+3;
            this.control++;
        }else{
            if(this.control<=320){
                this.x-=1;
                this.y=this.y-3;
                this.control++;
            }else{
                this.control=1;
                this.x+=320;
            }  
        }

        this.game.physics.arcade.collide(this, this.player,this.player.takeHit);
        this.player.hit=1;
    }
    destroyItself(skill,victim){
        var i = 0;
        for(i=0;i<skill.characterCtrl.personagens.length;i++){
            if(skill.characterCtrl.personagens[i]==victim){
                skill.characterCtrl.personagens[i]=null                      
            }                            
        }
        victim.destroy();
        skill.destroy();
    }    
}




class Demon extends Phaser.Sprite {
    constructor(game, x, y,player,skillCtr) {
        super(game, x, y, 'demon')   
        this.anchor.setTo(0.5, 0.5)
        this.vetorDefault = [0,1,2]
        this.speed = 5 //velocidade de troca dos sprites        
        this.typeEnemy="MOB"
        this.control=1
        this.player = player;      
        this.skillCtrl = skillCtr;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.creationTime=this.game.time.now
        this.body.setSize(100,100,0,10)
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        
        //if(this.animations!=null){
            //this.animations.add('default',this.vetorDefault,this.speed,true);  
            //this.animations.play('default'); 
        //}
        
        //this.fireBlast = new FireBlast(this.game,this.x,this.y,this.player);
        //this.body.moveTo(10000,2000,Phaser.ANGLE_LEFT);     
    }

    update() {
        if(this.game==null){
            return 0;
        }        
        if(this.game.time.now-this.creationTime>3000){
            this.fireBlast = new DarkFireBlast(this.game,this.x,this.y,this.player);
            this.creationTime=this.game.time.now
            this.skillCtrl.add(this.fireBlast)
        }
        if(this.control<=60){
            this.y=this.y+2;
            this.control++;
        }else{
            if(this.control<=120){
                this.y=this.y-2;
                this.control++;
            }else{
                this.control=1;
            }  
        }
        this.game.physics.arcade.collide(this, this.player,this.player.takeHit);
        this.player.hit=1;
    }
    destroyItself(skill,victim){
        var i = 0;
        for(i=0;i<skill.characterCtrl.personagens.length;i++){
            if(skill.characterCtrl.personagens[i]==victim){
                skill.characterCtrl.personagens[i]=null                      
            }                            
        }
        victim.destroy();
        skill.destroy();
    }    
}

class Heartless extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'heartless')   
        this.anchor.setTo(0.5, 0.5)
        this.typeEnemy="MOB"
        this.vetorDefault = [0,1,2]
        this.speed = 3 //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.player = player;      
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.body.setSize(100,90,20,40)
        this.control=1; 
        //this.body.moveTo(10000,2000,Phaser.ANGLE_LEFT);     
    }

    update() {
           
        
        if(this.control<=60){
            this.x=this.x-6;
            this.control++;
        }else{
            if(this.control<=120){
                this.x=this.x+4;
                this.control++;
            }else{
                this.control=1;
            }  
        }

        this.game.physics.arcade.collide(this, this.player,this.player.takeHit);
        this.player.hit=1;
    }
    destroyItself(skill,victim){
        var i = 0;
        for(i=0;i<skill.characterCtrl.personagens.length;i++){
            if(skill.characterCtrl.personagens[i]==victim){
                skill.characterCtrl.personagens[i]=null                      
            }                            
        }
        victim.destroy();
        skill.destroy();
    }
}

class ShadowDemon extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'shadow')   
        this.anchor.setTo(0.5, 0.5)
        this.typeEnemy="MOB"
        this.vetorDefault = [0,1,2,3,4,5,6,7,8]
        this.speed = 5 //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.player = player;      
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.body.setSize(80,70,20,40) 
        this.tempX = this.x;
        //this.body.moveTo(10000,2000,Phaser.ANGLE_LEFT);     
    }

    update() {
        this.game.physics.arcade.collide(this, this.player,this.player.takeHit);
        this.player.hit=1;
        if(this.x>0){
            this.x-=3;
        }else{
            this.destroy();
            //this.x=this.tempX;
        }
        if(this.y>this.player.y && this.x-this.player.x<1000){
            this.y-=3;
        }else if(this.y<this.player.y && this.x-this.player.x<1000){
            this.y+=1;
        }
    }
    destroyItself(skill,victim){
        
        victim.destroy();
        skill.destroy();
    }    
}

class Gargol extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'gargol')   
        this.anchor.setTo(0.5, 0.5)
        this.typeEnemy="MOB"
        this.vetorDefault = [0,1,2,3,4,5]
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

class Phoenix extends Phaser.Sprite {
    constructor(game, x, y,player,skillCtr) {
        super(game, x, y, 'phoenix')   
        this.anchor.setTo(0.5, 0.5)
        this.vetorDefault = [4,5,6,7]
        //this.vetorDefault = [0]
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
class DarkFireBlast extends Phaser.Sprite {
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
        this.tint = 0xff0000;
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

class BloodBlast extends Phaser.Sprite {
    constructor(game, x, y,player) {
        super(game, x, y, 'darkballReverse')   
        this.anchor.setTo(0.5, 0.5)
        this.typeEnemy="MOB"
        this.vetorDefault = [0,1,2,3,4,5,6]
        this.speed = 5 //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');
        this.player = player;      
        this.game.physics.enable(this, Phaser.Physics.ARCADE);        
        //this.body.moveTo(2000,5000,Phaser.ANGLE_LEFT);
        this.game.add.existing(this);     
        this.creationTime=this.game.time.now
        this.tint = 0xff0000;
        this.soundEff = this.game.add.audio('blueFlameSound');
        this.soundEff.play();
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