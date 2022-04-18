
import { Game } from "../src/Game_Class.js";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

let The_Game = new Game();
The_Game.config_game(2,7);
The_Game.initiate_game_deal();

let ended = true;
let turn = The_Game.get_turn();
let counter = 1;
while(ended){
    console.clear()
    turn = The_Game.get_turn(); 
    
    // Aqui deberia ir el tema de los ataques
    let attacked = The_Game.receive_posible_attacks(turn);
    let player_deck = The_Game.get_deck_player(turn);
    
    console.log("Turn: "+counter+" The last card in the table is: "+"Number: "+The_Game.get_last_discarted().get_number()+"   --   Color: "+ The_Game.get_last_discarted().get_type());
    let non_selected = true;
    if (player_deck.length > 0){
        while (non_selected){

        console.log("You were not attacked");
        console.log("Player number "+turn+" is your turn!");
        console.log("Your Deck is composed by: ");
        for (let i = 0; i < player_deck.length; i++) {
            console.log("ID: "+i +"   --   Number: "+player_deck[i].get_number()+"   --   Color: "+ player_deck[i].get_type());
        }
    
        console.log("Press the ID to select the card, press P to Pick a card from deck");
        let rl = readline.createInterface({ input, output });
    
        
        
        let answer = await rl.question('What do you want to do?');
        console.log(`You selected: ${answer}`);
        
            if ("P" === answer || "p" === answer){
                
                let obtained = The_Game.pick_card_from_deck(turn);
                if(!obtained){
                    non_selected = !non_selected;
                }
                player_deck = The_Game.get_deck_player(turn);
            }
            else{
                answer = parseInt(answer);
                
                if(answer>=0 && answer < player_deck.length){
                    
                    if (The_Game.could_i_pull(turn, player_deck[answer])){
                        let color = "purpura"
                        
                        if(player_deck[answer].get_number() === "+4" || player_deck[answer].get_number() === "4Color"){
                            
                            let valid = false;
                                while(!valid){
                                    
                                    let rl = readline.createInterface({ input, output });
                                    let answer = await rl.question('Please select between 1 Red, 2 Green, 3 Blue, 4 Yellow');
                                    rl.close();
                                    answer = parseInt(answer);
                                    
                                    if(answer === 1){
                                        color ="Red";
                                        valid = !valid;
                                    }
                                    else if(answer === 2){
                                        color ="Green";
                                        valid = !valid;
                                    }
                                    else if(answer === 3){
                                        color ="Blue";
                                        valid = !valid;
                                    }
                                    else if(answer === 4){
                                        color ="Yellow";
                                        valid = !valid;
                                    }
                                }
                        }

                        The_Game.launch(turn, answer);
                        if (color !="purpura"){
                            The_Game.change_the_color(color);
                        }
                        
                        non_selected = !non_selected;
                    }
                }

                if (The_Game.winner()[0]){
                    ended = !ended;

                }
                
                

            }

            rl.close();  
            console.clear() 
            console.log("Turn: "+counter+" The last card in the table is: "+"Number: "+The_Game.get_last_discarted().get_number()+"   --   Color: "+ The_Game.get_last_discarted().get_type());
        }
        
        The_Game.refresh_turn();
    }
    else{
        console.log("Player number "+turn+" You were attacked, you picked all the punishment");
        let rl = readline.createInterface({ input, output });
        let answer = await rl.question('Press enter to continue...');
        rl.close();

    }
    
    counter += 1;
}

console.log("The game is over, hope you enjoyed it!");


