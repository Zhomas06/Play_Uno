import { Card } from "./Card_Class.js";


export class Player {

    constructor(id){
        this.list_cards = [];
        this.id = id;
    }

    add_card(card){        

        this.list_cards.push(card);
    
    }

    remove_card(card){

        let index = this.list_cards.indexOf(card);
        this.list_cards.splice(index,1)

    }

}