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
        this.list_cards.splice(index,1);

    }

    get_id(){
        return this.id;
    }

    get_card(index){

        return this.list_cards[index];
    }

    get_length_deck(){

        return this.list_cards.length;
    }

}