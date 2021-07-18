## Reach Modified Bluffing Game

Our bluffing game is a simple dice game that often use to bet/drinking bear in the party. It can be two players game or multiple players game(we will develop two players game first). Each player has 5 dice, when game begins, player rolls the dice, and bluffs there are the number of #DiceNumberA #DiceValueA, then another player will believe or not, if believe, he need to bluff (at least #DiceNumberA + 1 #DiceValueA) or (#DiceNumberA #DiceNumberB which #DiceNumberB > #DiceNumberA), then the first player will deceide to believe or not. if not believe, players will show their dice and see the result to determine whether the player win or lose.

## Rule

### 1
If #valueOne is not called, then it can be represented as any number
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

there are 7 + 2个 1 in the game

## Step (two players)
    -A deploys game, set wager

    -B as attacher, join game, accept accep wager

    -AB roll the dice 

    -A bluff

    -B bluff

    -A bluff

    ...

    -A bluff

    -B open

    - check result and transfer money

## How to run 

`./reach react`

## ISSUE

## what can be improved

