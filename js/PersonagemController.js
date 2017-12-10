class PersonagemController{

    constructor(){        
        this.personagens = [0];
        this.listCounter = 0;              
    }

    add(p){
        this.personagens[this.listCounter] = p;
        this.listCounter = this.listCounter+1;
    }

    get(nome){
        var i = 0;
        for(i = 0; i<this.personagens.length; i++){
            if( (this.personagens[i].nome.localeCompare(nome))==0 ){
                return this.personagens[i];
            }
        }
    }
}