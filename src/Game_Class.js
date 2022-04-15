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

        this.deck =  Array.from(standard_cards.sort(function() {return Math.random() - 0.5})); // Once we decided that we want to play, the cards must be shuffled. Warning, do not forget to create the reference instead of copying
        this.list_players = [];
        this.discard = [];
        this.direction = +1;
        
        this.initial_cards = 0;
        this.turn = 0;
        this.pending_atacks = [];

    }

    config_game(players = 2, initial_cards = 7){
        //I want to allow to create dynamic matches.
        //I will put some limitation like... Do not request more cards than the deck size
        this.list_players = [];
        
        if (players * initial_cards > this.deck.length){
            
            throw "The number of cards requested is bigger than the deck's cards";
        }
        if ( players <= 1 || initial_cards <=0  ){
            throw "The values have no sence to initiate the game";
        }

        for (let number = 0; number < players ; number++) {
            this.list_players.push(new Player(number));
        }
        this.initial_cards = initial_cards;
    }

    get_config(){
        return [this.list_players.length,this.initial_cards]
    }

    get_number_of_players(){

        if (this.list_players.length === 0 ){

            throw "Please initiate the game before";
        }
        return this.list_players.length;
    }

    destroy_game(){

        this.deck =  Array.from(standard_cards.sort(function() {return Math.random() - 0.5})); // Once we decided that we want to play, the cards must be shuffled
        this.discard = [];
        this.direction = +1;

        if (this.list_players.length === 0 || this.initial_cards === 0){

            throw "Please initiate the game before"
        }
        this.config_game(this.list_players.length, this.initial_cards)

    }
    
    get_len_player_deck(number){

        if (number < 0 || this.list_players.length < number){

            throw "Invalid ID provided"
        }

        return this.list_players[number].get_length_deck();
    }

    initiate_game_deal(){

        if (this.deck.length !== standard_cards.length){
            throw "Execute the destroy_game to re start the game";
        }
        
        
        
        for (let index = 0; index < this.initial_cards* this.list_players.length ; index++) {
            
            let jugador_index = index % this.list_players.length
            let card = this.deck[index];
            this.list_players[jugador_index].add_card(card)
        }       

        for (let index = 0; index < this.initial_cards* this.list_players.length ; index++) {

            this.deck.splice(0,1);
        }
        // The first discarted card.
        let card = this.deck[0];
        this.discard.push(card);
        this.deck.splice(0,1);
    }

    get_deck_player(index){

        return this.list_players[index];
    }

    get_last_discarted(){

        return this.discard[this.discard.length - 1]
    }

    get_len_discarted(){

        return this.discard.length;

    }

    get_turn(){
        return this.turn;
    }

    refresh_turn(){

        this.turn += this.direction;

        if ( this.get_number_of_players() <= this.turn){
            this.turn = this.turn % this.get_number_of_players();
        }
        if (this.turn<0){
            this.turn = this.get_number_of_players()-1
        }

    }

    inverse_turn(){
        this.direction = -this.direction;
    }

    could_i_pull(id_player, Card){

        if (id_player !== this.turn){

            return false;

        }

        if (this.pending_atacks.length === 0){

            if (Card.get_number() === this.discard[this.discard.length - 1].get_number()){
                return true;
            }

            if (Card.get_type() === this.discard[this.discard.length - 1].get_type()){
                
                return true;
            }

        }

        if (this.pending_atacks.length ){

            if (["+2","+4"].includes(Card.get_number()) ){

                return true;

            }
            
        }

        return false;

    }

}

