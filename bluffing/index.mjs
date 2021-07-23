import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
import { ask, yesno, done } from '@reach-sh/stdlib/ask.mjs';

(async () => {
  const stdlib = await loadStdlib();

  const isAlice = await ask(
    `Are you Alice?`,
    yesno
  );
  const who = isAlice ? 'Alice' : 'Bob';

  console.log(`Starting Rock, Paper, Scissors! as ${who}`);

  let acc = null;
  const createAcc = await ask(
    `Would you like to create an account? (only possible on devnet)`,
    yesno
  );
  if (createAcc) {
    acc = await stdlib.newTestAccount(stdlib.parseCurrency(1000));
  } else {
    const secret = await ask(
      `What is your account secret?`,
      (x => x)
    );
    acc = await stdlib.newAccountFromSecret(secret);
  }

  let ctc = null;
  const deployCtc = await ask(
    `Do you want to deploy the contract? (y/n)`,
    yesno
  );
  if (deployCtc) {
    ctc = acc.deploy(backend);
    const info = await ctc.getInfo();
    console.log(`The contract is deployed as = ${JSON.stringify(info)}`);
  } else {
    const info = await ask(
      `Please paste the contract information:`,
      JSON.parse
    );
    ctc = acc.attach(backend, info);
  }

  const fmt = (x) => stdlib.formatCurrency(x, 4);
  const getBalance = async () => fmt(await stdlib.balanceOf(acc));

  const before = await getBalance();
  console.log(`Your balance is ${before}`);

  const interact = { ...stdlib.hasRandom, ...stdlib.hasConsoleLogger };


  interact.informTimeout = () => {
    console.log(`There was a timeout.`);
    process.exit(1);
  };

  if (isAlice) {
    const amt = await ask(
      `How much do you want to wager?`,
      stdlib.parseCurrency
    );
    interact.wager = amt;
  } else {
    interact.acceptWager = async (amt) => {
      const accepted = await ask(
        `Do you accept the wager of ${fmt(amt)}?`,
        yesno
      );
      if (accepted) {
        return;
      } else {
        process.exit(0);
      }
    };
  }

  const HAND = ['Rock', 'Paper', 'Scissors', 'guess'];
  const HANDS = {
    'Rock': 0, 'R': 0, 'r': 0,
    'Paper': 1, 'P': 1, 'p': 1,
    'Scissors': 2, 'S': 2, 's': 2,
    'guess':3, 'G':3, 'g':3
  };

  const FACES = [-1, -1, -1, -1, -1];
  interact.generateFaces = async() => {
    const num1 = Math.ceil(Math.random() * 6);
    const num2 = Math.ceil(Math.random() * 6);
    const num3 = Math.ceil(Math.random() * 6);
    const num4 = Math.ceil(Math.random() * 6);
    const num5 = Math.ceil(Math.random() * 6);
    const res = [num1, num2, num3, num4, num5];
    console.log(`the generated dices are ${res}`)
    return res;
  }

  interact.getFace = async () => {
    const face1 = Math.ceil(Math.random() * 6);
    console.log(`You got ${face1}`);
    return face1;
  }

  interact.guessAmount = async () => {
    const guess = await ask(`What is the amount of the face`, (x) => {
    const guess = parseInt(x, 10);
      if ( guess == null ) {
        throw Error(`Not a valid guess ${guess}`);
      }
      return guess;
    });
    console.log(`Amount: ${guess}`);
    return guess;
  };

  interact.guessFace = async () => {
    const guess = await ask(`What is the value of the face`, (x) => {
    const guess = parseInt(x, 10);
      if ( guess == null ) {
        throw Error(`Not a valid guess ${guess}`);
      }
      return guess;
    });
    console.log(`Face: ${guess}`);
    return guess;
  };

  interact.ifChallenge = async(currAmount, currFace) => {
    const challenged = await ask(`Amount: ${currAmount}, Face: ${currFace}.
                           Do you want to challenge this guess?`, 
                           yesno);
    if (challenged) {
      return 1;
    }
    else{
      return 0;
    }
  }

  interact.keepBidding = async (currAmount, currFace) => {
    const amt = await ask(`What is the amount?`, (x) => {
      const amt = parseInt(x, 10);
      if (amt < currAmount){
        throw Error("please bid more amount which is greater than current amount")
      }
      return amt;
    });
    const face = await ask(`What is the Face?`, (y) => {
      const face = parseInt(y, 10);
      if (amt == currAmount && face <= currFace){
        throw Error('you should bid more')
      }
      return face;
    });

    console.log(`You guessed amt:${amt}, face:${face}`);
    return [amt, face];
  };

  interact.ifWinner = async(diceA, diceB, a, f, person) => {
      var count = 0;
      for (let i=0; i<6; i++){
        if (diceA[i] == 1 || diceA[i] == f){
          count += 1;
        }
        console.log(diceA[i], count)
        if (diceB[i] == 1 || diceB[i] == f){
          count += 1;
        }
        console.log(diceB[i], count)
      }
      console.log(`diceA ${diceA}`)
      console.log(`diceB ${diceB}`)
      console.log(`the number of ${f} is ${count}`)
      console.log(a>count)
      return a>count;
        
  }
  


  const OUTCOME = ['Bob wins', 'Draw', 'Alice wins'];
  interact.seeOutcome = async (outcome) => {
    console.log(`The outcome is: ${OUTCOME[outcome]}`);
  };

  const part = isAlice ? backend.Alice : backend.Bob;
  await part(ctc, interact);

  const after = await getBalance();
  console.log(`Your balance is now ${after}`);

  done();
})();