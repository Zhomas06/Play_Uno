# Play_Uno
The aim of this project is to create a library that allow you to play UNO game

According to the needs of the project. Here the explanation of how it was performed.
------------------------------------------------------------------
I decided to use the TDD methodology to carry out the development of the project.

Pros: It helped me to find bugs much faster and avoid errors.
Cons: It is a very very slow method...

In reference to the application: 
- Represent all the cards in the game. [Create all the tools so that each player can see the only cards he can see (his hand and the last card thrown)]
- Deal the hands (give each player cards at random or according to the rules of the game). [Done]
- Know which cards are visible or invisible to others (sometimes games have cards on the table).[As it was one, it was easy, as only the player can see his own cards and at most the number of cards of the other players. In fact, the methods require the player's ID (they are linked to the turn), a dictionary could be made so that they are not so obvious, but a priori the players should not be able to see each other.]
- Remove or add cards to players, or change the visibility. [Done]
- Compare the hands of different players, or calculate the scores of each player's cards. [In UNO the only thing that matters is running out of cards. The game ends when 1 person reaches 0. The score can be extracted from the method that gives you the length of all players' decks.]

I would like to add a couple of commands:
- npm run test:watch ||| To see the tests performed and the % of lines covered.
- npm run start_game ||| To start playing! I developed a demo with the rules I use.

As for the tests. I would like to comment that I have not done 100% coverage. This is due to two factors:
- Lack of time.
- They need keyboard input to be able to emulate it.