import { Game } from "../src/Game_Class.js";

test('Create Game', () => {
    let The_Game = new Game()
  expect(The_Game).toBeDefined();
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