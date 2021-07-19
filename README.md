## Reach Modified Bluffing Game

Our bluffing game is a simple dice game that often use to bet/drinking beer in the party. It can be two players game or multiple players game(we will develop two players game first). Each player has 5 dice, when game begins, player rolls the dice simutaneously, keep them hidden from other players, and make a bid consisting of #AmountA #FaceA. The amount represents the player's guess as to how many of each face have been rolled by all of the players at the table, including themselves. Once he/she makes his/her guess, the other player(s) have several options: 

1. bid of a larger amount of #FaceA 
2. bid the same amount of #AmountA, but a higher face value. 
3. both 1 and 2
4. challenge the current bid

When a bid is challenged, every player reveals their dice and check if the current bid is matched or not. If the bid is neither matched nor exceeded, the challenger wins(caught this bidder bluffing). Otherwise, the bidder wins. 


## Rule

### 1
If #valueOne is not called, then it can be represented as any number (you mean valueOne is wild???)
#### example one
handA = {1, 1, 2, 3, 4}
handB = {1, 2, 3, 4, 4}

A bluff there are at least 3个2, B opens, A wins (there are 2个2， 3个1，一共5个2)
A bluff there are at least 5个2, B opens, A wins (there are 2个2， 3个1，一共5个2)
A bluff there are at least 6个2, B opens, B wins (there are 2个2， 3个1，一共5个2)

### 2

If #valueOne is called, then #valueOne can only be #valueOne

#### example two
handA = {1, 1, 2, 3, 4}
handB = {1, 2, 3, 4, 4}

A bluff there are 2 1, B bluff 3 2, A open, A win (2 2 totally)

### 3

if one players get only value 1 and one of (2, 3,4,5,6), lile 1个1, 4个2, it is consider as 6个2

#### example three
handA = {1, 1, 2, 2, 2}
handB = {1, 2, 3, 4, 4}

there are 6 + 2个 2 in the game


### 4

if one players get all same value, then it can be considered as 7 that value's dice

#### example four
handA = {2, 2, 2, 2, 2}
handB = {1, 2, 3, 4, 4}

there are 7 + 2个 2 in the game

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

## ISSUE

## what can be improved 


