import { Card } from "./Card_Class.js";
import { Player } from "./Player.js";

// Init the entire deck
let standard_cards = [];
let type_cards = ["Red","Green","Blue","Yellow"];
let special_colored_cards = ["+2","direction","NO"]
let special_card = ["+4","4Color"]

for (let number = 0; number < 10 ; number++) {
    for (const type of type_cards) {
        standard_cards.push(new Card(number.toString(), [type],false)); 
    }       
}

for (const number of special_colored_cards) {
    for (const type of type_cards) {
        standard_cards.push(new Card(number.toString(), [type],false)); 
    }       
}

for (const number of special_card) {
    for (let type = 0; type < 4 ; type++) {
        standard_cards.push(new Card(number.toString(), type_cards,true)); 
    }       
}
export class Game {

    constructor(){

        this.deck = standard_cards.sort(function() {return Math.random() - 0.5}); // Once we decided that we want to play, the cards must be shuffled
        this.list_players = [];
        this.discard = [];
        this.direction = +1;
        this.last_card = null;
        this.initial_cards = 0;

    }

    config_game(players = 2, initial_cards = 7){
        //I want to allow to create dynamic matches.
        //I will put some limitation like... Do not request more cards than the deck size

        if (players * initial_cards > this.deck.length){
            throw "The number of cards requested is bigger than the deck's cards";
        }
        if ( players <= 1 || initial_cards <=0  ){
            throw "The values have no sence to initiate the game";
        }

        for (let number = 0; number < players ; number++) {
            this.list_players.push(new Player("Player " + number));
        }
        this.initial_cards = initial_cards;
    }

    get_config(){
        return [this.list_players.length,this.initial_cards]
    }

    destroy_game(){

        this.deck = standard_cards.sort(function() {return Math.random() - 0.5}); // Once we decided that we want to play, the cards must be shuffled
        this.discard = [];
        this.direction = +1;
        this.last_card = null;
        
        this.config_game(this.list_players.length, this.initial_cards)

    }
    
    initiate_game_deal(){

        if (this.deck.length !== standard_cards.length){
            throw "Execute the destroy_game to re start the game";
        }
        for (let index = 0; index < this.initial_cards.length * this.list_players.length ; index++) {
            
            
        }

    }
}
