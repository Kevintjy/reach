'reach 0.1';

const [ isHand, ROCK, PAPER, SCISSORS, GUESS ] = makeEnum(4);
const [ isOutcome, B_WINS, DRAW, A_WINS ] = makeEnum(3);

const winnerA = (faceA, faceB, guess) =>
  (faceA+faceB < guess) ? 2 : 0

const getWinnerA = (ifBluffing) =>
  (ifBluffing)? 2 : 0

const getWinnerB = (ifBluffing) =>
  (ifBluffing)? 0 : 2

const winnerB = (faceA, faceB, guess) =>
  (faceA+faceB < guess) ? 0 : 2

const Player =
      { ...hasRandom,
        ...hasConsoleLogger,
        generateFaces: Fun([], Array(UInt, 5)),
        ifChallenge: Fun([UInt, UInt], UInt),
        ifWinner: Fun([Array(UInt, 5), Array(UInt, 5), UInt, UInt, UInt], Bool),
        keepBidding: Fun([UInt, UInt], Array(UInt, 2)),
        seeOutcome: Fun([UInt], Null),
        informTimeout: Fun([], Null),
      };
const Alice =
      { ...Player,
        wager: UInt };
const Bob =
      { ...Player,
        acceptWager: Fun([UInt], Null)
        };

const DEADLINE = 300;
export const main =
  Reach.App(
    {},
    [Participant('Alice', Alice), Participant('Bob', Bob)],
    (A, B) => {
      const informTimeout = () => {
        each([A, B], () => {
          interact.informTimeout(); }); };

      A.only(() => {
        const wager = declassify(interact.wager); });
      A.publish(wager)
        .pay(wager);
      commit();

      B.only(() => {
        interact.acceptWager(wager); });
      B.pay(wager)
        .timeout(DEADLINE, () => closeTo(A, informTimeout));
      commit();

      A.only(() => {
        const diceA = declassify(interact.generateFaces());
      })
      A.publish(diceA)
      commit();

      B.only(() => {
        const diceB = declassify(interact.generateFaces());
      })
      B.publish(diceB)


      var [outcome, turn, first_call, aA, fA, aB, fB] = [DRAW, 0, 1, 99, 99, 99, 99];
      invariant(balance() == 2 * wager && isOutcome(outcome) );
      while ( outcome == 1 ) {
        if (first_call == 1){
          commit();
          A.only(() => {
              const [amountA, faceA] = declassify(interact.keepBidding(0, 0));
            });
          A.publish(amountA, faceA)
            .timeout(DEADLINE, () => closeTo(B, informTimeout));
          [first_call, aA, fA] = [0, amountA, faceA];
          continue
        }
        else{         
          if (turn == 1){
            commit();
            A.only(() => {
              const AChallengeB = declassify(interact.ifChallenge(aB, fB));
            });
            A.publish(AChallengeB);
            if (AChallengeB == 1){
              commit();
              A.only(()=> {
                const tester = declassify(interact.ifWinner(diceA, diceB, aB, fB, 0));
              });
              A.publish(tester)
                .timeout(DEADLINE, () => closeTo(B, informTimeout));
              [turn, outcome] = [1, getWinnerA(tester)];
              continue;
            }
            else{
              commit();
              A.only(() => {
                const [amountA, faceA] = declassify(interact.keepBidding(aB, fB));
              })
              A.publish(amountA, faceA);
              [turn, aA, fA] = [0, amountA, faceA];
              continue;
              }
          }
          else{
            commit()
            B.only(() => {
              const BChallengeA = declassify(interact.ifChallenge(aA, fA));
            });
            B.publish(BChallengeA);
            if (BChallengeA == 1){
              commit();
              B.only(()=> {
                const tester = declassify(interact.ifWinner(diceA, diceB, aA, fA, 1));
              });
              B.publish(tester)
                .timeout(DEADLINE, () => closeTo(A, informTimeout));
              [turn, outcome] = [1, getWinnerB(tester)];
              continue;
            }
              else{
                commit();
                B.only(() => {
                  const [amountB, faceB] = declassify(interact.keepBidding(aA, fA));
                });
                B.publish(amountB, faceB)
                  .timeout(DEADLINE, () => closeTo(A, informTimeout));
                [turn, aB, fB] = [1, amountB, faceB];
                continue
              }

            // commit();
            }
        }
      }
      assert(outcome == A_WINS || outcome == B_WINS);
      transfer(2 * wager).to(outcome == A_WINS ? A : B);
      commit();

      each([A, B], () => {
        interact.seeOutcome(outcome); });
      exit(); 
  });