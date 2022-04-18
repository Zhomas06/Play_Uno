import { Card } from "../src/Card_Class.js";
import { Game } from "../src/Game_Class.js";
import { Player } from "../src/Player.js";

test('Create Game', () => {
    let The_Game = new Game()
  expect(The_Game).toBeDefined();
});

test('Config Method', () => {
  let The_Game = new Game()
expect(() => {The_Game.config_game(6,10)}).not.toThrow();
});

test('Bad config, Throw', () => {
  let The_Game = new Game()
expect(() => {The_Game.config_game(100,100)}).toThrow();
});

test('Bad config, more than deck capacity', () => {
  let The_Game = new Game()
expect(() => {The_Game.config_game(100,100)}).toThrow();
});

test('Bad config, Negative players', () => {
  let The_Game = new Game()
expect(() => {The_Game.config_game(-1,100)}).toThrow();
});

test('Bad config, Negative Card in hand', () => {
  let The_Game = new Game()
expect(() => {The_Game.config_game(100,-1)}).toThrow();
});

test('Default config', () => {
  let The_Game = new Game()
  The_Game.config_game()
expect(The_Game.get_config()).toStrictEqual([2,7]);
});

test('Receive the right configuration', () => {
  let The_Game = new Game()
  The_Game.config_game(6,10)
expect(The_Game.get_config()).toStrictEqual([6,10]);
});

test('Destroy Method Throw if not initiate the game before', () => {
  let The_Game = new Game()
expect(() => {The_Game.destroy_game()}).toThrow();
});

test('Destroy Method Does Not Throw', () => {
  let The_Game = new Game()
  The_Game.config_game(6,10)
expect(() => {The_Game.destroy_game()}).not.toThrow();
});

test('get_number_of_players Throw if not initiate the game before', () => {
  let The_Game = new Game()
expect(() => {The_Game.get_number_of_players()}).toThrow();
});

test('get_number_of_players return the number of players', () => {
  let The_Game = new Game()
  The_Game.config_game(6,10)
expect(The_Game.get_number_of_players()).toBe(6);
});

test('initiate the game 6 players and 7 cards by hand', () => {
  let The_Game = new Game();
  The_Game.config_game(6,7);
  The_Game.initiate_game_deal();
  let lista_len = [];
  for (let index = 0; index < 6; index++) {
      lista_len.push(The_Game.get_len_player_deck(index)); 
  }
expect(lista_len).toStrictEqual([7,7,7,7,7,7]);
});

test('initiate the game (6,7) put first discarted card', () => {
  let The_Game = new Game();
  let One_card = new Card(1,"Red", true);
  The_Game.config_game(6,7);
  The_Game.initiate_game_deal();
  expect(typeof The_Game.get_last_discarted(0)).toStrictEqual(typeof One_card);
});

test('initiate the game (6,7) put first discarted card', () => {
  let The_Game = new Game();
  let One_card = new Card(1,"Red", true);
  The_Game.config_game(6,7);
  The_Game.initiate_game_deal();
  expect(The_Game.get_len_discarted()).toStrictEqual(1);
});

test('invalid len request (more than number of players)', () => {
  let The_Game = new Game()
  The_Game.config_game(6,7);
  The_Game.initiate_game_deal();
expect(() => {The_Game.get_len_player_deck(7)}).toThrow();
});

test('invalid len request (negative number players)', () => {
  let The_Game = new Game()
  The_Game.config_game(6,7);
  The_Game.initiate_game_deal();
expect(() => {The_Game.get_len_player_deck(-1)}).toThrow();
});

test('Throw when initiate without distroy the game', () => {
  let The_Game = new Game();
  The_Game.config_game(6,7);
  The_Game.initiate_game_deal();
  expect(() => {The_Game.initiate_game_deal()}).toThrow();
});

test('Receive a Card when I request one', () => {
  let The_Game = new Game();  
  let One_card = new Card(1,"Red", true);
  The_Game.config_game(6,7);
  The_Game.initiate_game_deal();
  expect(typeof The_Game.get_deck_player(0)).toStrictEqual(typeof One_card);
});

test('initiate the game (6,7) turn as 0', () => {
  let The_Game = new Game();
  The_Game.config_game(6,7);
  The_Game.initiate_game_deal();
  expect(The_Game.get_turn()).toStrictEqual(0);
});


test('Refresh turn 1', () => {
  let The_Game = new Game();
  The_Game.config_game(6,7);
  The_Game.initiate_game_deal();
  The_Game.refresh_turn();
  expect(The_Game.get_turn()).toStrictEqual(1);
});

test('Refresh turn 4 times being 3, and starting the loop', () => {
  let The_Game = new Game();
  The_Game.config_game(3,7);
  The_Game.initiate_game_deal();
  The_Game.refresh_turn();
  The_Game.refresh_turn();
  The_Game.refresh_turn();
  The_Game.refresh_turn();
  expect(The_Game.get_turn()).toStrictEqual(1);
});

test('Inverse turn and Refresh turn 1', () => {
  let The_Game = new Game();
  The_Game.config_game(6,7);
  The_Game.initiate_game_deal();
  The_Game.inverse_turn();
  The_Game.refresh_turn();
  expect(The_Game.get_turn()).toStrictEqual(The_Game.get_number_of_players()-1);
});

test('Create the method winner', () => {
  let The_Game = new Game();
  The_Game.config_game(2,1);
  expect(The_Game.winner()).toBeDefined();
});

test('Throw winner if not initiated the game', () => {
  let The_Game = new Game();
 
  expect(() => {The_Game.winner()}).toThrow();
});

test('Winner Return [false,-1] if no winner', () => {
  let The_Game = new Game();
  The_Game.config_game(2,1);
  The_Game.initiate_game_deal();
  expect(The_Game.winner()).toStrictEqual([false,-1]);
});

test('Winner Return [true,2] if winner', () => {
  let The_Game = new Game();
  let The_Player = new Player(2)
  The_Game.config_game(2,1);
  The_Game.initiate_game_deal();
  The_Game.list_players.push(The_Player); //This is little injection of code, It is more hard to emulate a play.
  expect(The_Game.winner()).toStrictEqual([true,2]);
});

test('Launch a card method created', () => {
  let The_Game = new Game();
  The_Game.config_game(2,7);
  The_Game.initiate_game_deal();
  expect(The_Game.launch(0,1)).toBeDefined();
});

test('Throw Launch if not initiated the game', () => {
  let The_Game = new Game();
 
  expect(() => {The_Game.launch(0,1)}).toThrow();
});

test('Launch a card method return false if is not your turn', () => {
  let The_Game = new Game();
  The_Game.config_game(2,7);
  The_Game.initiate_game_deal();
  expect(The_Game.launch(1,3)).toBe(false);
});

test('Launch return true if it is possible to put a card', () => {
  let The_Game = new Game();
  let The_Card = new Card(1,"Red", true);
  The_Game.config_game(2,7);
  
  The_Game.last_discarted = The_Card;
  The_Game.list_players[0].add_card(The_Card)
  expect(The_Game.launch(0,0)).toBe(true);
});

test('Throw direction card, reverse direction', () => {
  let The_Game = new Game();
  let The_Card = new Card("direction","Green", true);
  let The_Player = new Player(1);
  The_Game.config_game(2,7);
  The_Game.list_players.push(The_Player);
  The_Game.last_discarted = The_Card;
  The_Game.list_players[0].add_card(The_Card)
  The_Game.launch(0,0)
  expect(The_Game.direction).toBe(-1);
});

test('+4 sums +4 to the attack', () => {
  let The_Game = new Game();
  
  The_Game.increment_attacks(4)
  expect(The_Game.pending_atacks).toBe(4);
});

test('4Color change the color of th last one', () => {
  let The_Game = new Game();
  let The_Card = new Card("direction","Green", true);
  The_Game.last_discarted = The_Card;
  The_Game.change_the_color("Red")
  expect(The_Game.last_discarted.get_type()[0]).toBe("Red");
});


//Validate the class card

test('Create Card', () => {
  let The_Card = new Card(1,"Red", true);
expect(The_Card).toBeDefined();
});

test('Get number of a card', () => {
  let The_Card = new Card(1,"Red", true);
expect(The_Card.get_number()).toBe(1);
});

test('Get type of a card', () => {
  let The_Card = new Card(1,"Red", true);
expect(The_Card.get_type()).toBe("Red");
});

test('Get additional action of a card', () => {
  let The_Card = new Card(1,"Red", true);
expect(The_Card.get_additional_action()).toBe(true);
});

test('Change color of a card', () => {
  let The_Card = new Card(1,"Red", true);
  The_Card.change_color("invented")
expect(The_Card.get_type()[0]).toBe("invented");
});

//Validate the class Player

test('Get the card of a player', () => {
  let The_Player = new Player(1);  
  let One_card = new Card(1,"Red", true);
  The_Player.add_card(One_card);
  expect(The_Player.get_card(0)).toStrictEqual(One_card);
});


test('Remove the card of a player', () => {
  let The_Player = new Player(1);  
  let One_card = new Card(1,"Red", true);
  The_Player.add_card(One_card);
  The_Player.remove_card(One_card);
  expect(The_Player.get_card(0)).not.toBeDefined();
});

test('Get ID from player', () => {
  let The_Player = new Player(1);  

  expect(The_Player.get_id()).toBe(1);
});
