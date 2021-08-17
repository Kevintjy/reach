## Reach Modified Bluffing Game

Our bluffing game is a simple dice game that often use to bet/drinking beer in the party. It can be two players game or multiple players game(we will develop two players game first). Each player has 5 dice, when game begins, player rolls the dice simutaneously, keep them hidden from other players, and make a bid consisting of #Amount #Face. The amount represents the player's guess as to how many of each face have been rolled by all of the players at the table, including themselves. Once he/she makes his/her guess, the other player(s) have several options: 

1. bid of a larger amount of #Face 
2. bid the same amount of #Amount, but a higher face value. 
3. both 1 and 2
4. challenge the current bid

When a bid is challenged, every player reveals their dice and check if the current bid is matched or not. If the bid is neither matched nor exceeded, the challenger wins(caught this bidder bluffing). Otherwise, the bidder wins. 

[See Video Demo Here](https://www.google.com "Demo Video")

## Rule

### 1
Face 1 is wild
#### example one
handA = {1, 1, 2, 3, 4}
handB = {1, 2, 3, 4, 4}

A bluff there are at least 3 2s, B opens, A wins (there are 2 2s， 3 1s, 5 2s in total)
A bluff there are at least 5 2s, B opens, A wins (there are 2 2s， 3 1s, 5 2s in total)
A bluff there are at least 6 2s, B opens, B wins (there are 2 2s， 3 1s, 5 2s in total)

### 2

If #valueOne is called, then #valueOne can only be #valueOne

#### example two
handA = {1, 1, 2, 3, 4}
handB = {1, 2, 3, 4, 4}

A bluff there are 2 1, B bluff 3 2, A open, A win (2 2 totally)

### 3

if one players get only value 1 and one of (2, 3,4,5,6), lile 1 1s and 4 2s in their set, it is consider as 6 2s

#### example three
handA = {1, 1, 2, 2, 2}
handB = {1, 2, 3, 4, 4}

there are (6 + 2) 2s in the game


### 4

if one players get all same value, then it can be considered as 7 that value's dice

#### example four
handA = {2, 2, 2, 2, 2}
handB = {1, 2, 3, 4, 4}

there are (7 + 2) 2s in the game

## Step (two players)
    -A deploys game, set wager

    -B as attacher, join game, accept wager

    -AB roll the dice 

    -A bid

    -B bid

    -A bid

    ...

    -A bid

    -B challenge

    -check result and transfer money

## How to run 

`./reach react`

## Challenges
The syntax of Reach is defininetly new for both of us, and it takes some time to fully digest what each "commit" does. 
The usage of docker and the operations behind it also causes some confusions. For example, when we run command `./reach react`, we didn't know the operations  running in the back. All the tutorials did an awesome job of introducing the language Reach, but it would be really helpful if they explain some concepts like that :) 

## What can be Improved 
Even though this is a popular drinking game in China, the rules for different reigions are slightly different. Sometimes 1s are not wild when they are called as a particular face (like two 1s). We wish to add a feature where people can select if they want to add this as their game rules before they start the game. We also like to expand this as a multiplayer game with more than one attachers. 

## references 
Video demonstration cover page:</br>
Yuumi(background): https://na.leagueoflegends.com/en-us/champions/yuumi/ </br>
YOU AND ME!(icon): https://na.leagueoflegends.com/en-us/champions/yuumi/</br>
Infinity edge (icon): https://leagueoflegends.fandom.com/wiki/Infinity_Edge_(Wild_Rift)</br>
Dice 6 (icon) && dices in game: https://commons.wikimedia.org/wiki/Category:Dice_faces</br>
GameCenter Background: https://stock.adobe.com/search?k=casino+table+background&asset_id=325384191</br>

