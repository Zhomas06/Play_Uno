import { Card } from "./Card_Class.js";
import { Player } from "./Player.js";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

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
        standard_cards.push(new Card(number.toString(), [type],true)); 
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
        this.last_discarted = 0;
        this.direction = +1;
        
        this.initial_cards = 0;
        this.turn = 0;
        this.pending_atacks = 0;

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
        this.last_discarted = 0;
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
        
        this.last_discarted = new Card(card.get_number(), card.get_type(),card.get_additional_action()) //Could be modified by the card 4color
        this.discard.push(card);
        this.deck.splice(0,1);

        if(card.get_number() === "direction"){
            this.inverse_turn()
        } // Invers the direction of the turn.
        if(card.get_number() === "+2"){
            this.increment_attacks(2);

        } // +2
        if(card.get_number() === "+4"){
            this.increment_attacks(4);
        } // +4
       
    }

    increment_attacks(number){
        this.pending_atacks = this.pending_atacks + number
    }

    change_the_color(color){
        this.last_discarted.change_color(color);
    }

    get_deck_player(index){
        if (index === this.turn){return this.list_players[index].get_deck();}
        return []
        
    }

    get_last_discarted(){

        return this.last_discarted;
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
        
        if (this.pending_atacks === 0){
            
            if (Card.get_number() === this.last_discarted.get_number() || 
            ["4Color","+4"].includes(Card.get_number()) ||
            ["4Color","+4"].includes(this.last_discarted.get_number())  ){
                return true;
            }

        }

        if (this.pending_atacks ){

            if (["+2","+4"].includes(Card.get_number()) ){

                return true;

            }
            
        }

        return false;

    }

    winner(){
    //In UNO the score it is the length of the hand of each player, if you have 0 cards you win.    
        if (this.list_players.length === 0){
            throw "Init the game before use method winner"
        }
        for (let i = 0; i < this.list_players.length; i++) {
            
            if (this.get_len_player_deck(i) === 0){ //Have no sense to develope som score method...

                return [true,i];

            }
            
        }
        return [false,-1];
    }

   init_turn(){
//All the times, the direction must be normalized, because the "NO" increment the direction to +- 2 to jump the next player.
    this.direction = this.direction / Math.abs(this.direction);
   }
   intermission_power(){
    this.direction = 2*this.direction;
   }


   pick_card_from_deck(player_id){

    if (player_id === this.turn){
        
        
        if ( this.deck.length === 0 && this.discard.length > 0){

            this.deck =  Array.from(this.discard.sort(function() {return Math.random() - 0.5}));
            this.discard = [];

        }

        if (this.deck.length > 0){

            let card = this.deck[0];
            this.list_players[player_id].add_card(card);
            this.deck.splice(0,1);
            
            return true;
        }     
            
        return false;
        }

    }



receive_posible_attacks(player_id){
    
    if (player_id === this.turn && this.pending_atacks){
            
        let list_of_cards = this.get_deck_player(player_id);
        let aux_saved = false;
        for (let i = 0; i < list_of_cards.length; i++) {
            
            if (this.could_i_pull(player_id, list_of_cards[i])){
                aux_saved = true;
            }
        }
        if (aux_saved === false){

            for (let i = 0; i < this.pending_atacks; i++){

                this.pick_card_from_deck(player_id);   
            }
            this.pending_atacks = 0;
            this.refresh_turn();
            return true;
        }
        return false;

    }
}

launch(id, card_id){
    if (this.list_players.length === 0){
        throw "Init the game before use method winner"
    }
  
    
    if (card_id >=this.get_len_player_deck(id) || card_id < 0){
        return false
    }
    
    if (id !== this.turn){
        return false;
    }
 
    let card = this.list_players[id].get_card(card_id);
    
    
    let aux_lauch = this.could_i_pull(id, card);
    
    if (aux_lauch){
        this.init_turn();
        this.last_discarted = new Card(card.get_number(), card.get_type(),card.get_additional_action()) //Could be modified by the card 4color
        this.list_players[id].remove_card(card);
        this.discard.push(card);
        this.deck.splice(0,1);
        
        if (card.get_additional_action()){
            

            if(card.get_number() === "direction"){
                this.inverse_turn()
            } // Invers the direction of the turn.
            if(card.get_number() === "+2"){
                this.increment_attacks(2);
               

            } // +2
            if(card.get_number() === "+4"){
                this.increment_attacks(4);
               
            }// 4All
            if(card.get_number() === "NO"){
                this.intermission_power();
            } // NO
            
        }

        //Change the turn there.

        return true
    }
    
    return aux_lauch;

   }
}

