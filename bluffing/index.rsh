'reach 0.1';

const [ isHand, ROCK, PAPER, SCISSORS, GUESS ] = makeEnum(4);
const [ isOutcome, B_WINS, DRAW, A_WINS ] = makeEnum(3);

const winner = (faceA, faceB, guess) =>
  (faceA+faceB < guess) ? 0 : 2



const Player =
      { ...hasRandom,
        ...hasConsoleLogger,
        ifWinner: Fun([UInt, UInt, UInt], UInt),
        getFace: Fun([], UInt),
        guessNumOrChallenge: Fun([], UInt),
        guessNum: Fun([], UInt),
        seeOutcome: Fun([UInt], Null),
        informTimeout: Fun([], Null),
      };
const Alice =
      { ...Player,
        wager: UInt };
const Bob =
      { ...Player,
        acceptWager: Fun([UInt], Null),
        logshit: Fun([UInt, UInt], Null) };

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
      commit()

      A.only(() => {
        const faceA = declassify(interact.getFace());
      })
      A.publish(faceA)
      commit()
      B.only(() => {
        const faceB = declassify(interact.getFace());
      })
      B.publish(faceB)


      var [outcome, turn, first_call, tmpA, tmpB] = [DRAW, 0, 1, 99, 99];
      invariant(balance() == 2 * wager && isOutcome(outcome) );
      while ( outcome == 1 ) {
        if (first_call == 1){
          commit();
          A.only(() => {
            const handA = declassify(interact.guessNum())});
          A.publish(handA)
            .timeout(DEADLINE, () => closeTo(B, informTimeout));
          [first_call, tmpA] = [0, handA];
          continue
        }else{
          if (turn == 1){
            commit();
            A.only(() => {
              const handA = declassify(interact.guessNumOrChallenge())});
            A.publish(handA)
              .timeout(DEADLINE, () => closeTo(B, informTimeout));
            
            if (handA == 0){
              [turn, outcome] = [0, winner(faceA, faceB, tmpB)];
              continue
            }else{
              [turn, tmpA] = [0, handA];   
              continue
            }
            // commit();
          }else{
            commit();
            B.only(() => {
              const handB = declassify(interact.guessNumOrChallenge()); });
            B.publish(handB)
              .timeout(DEADLINE, () => closeTo(A, informTimeout));
            if (handB == 0){
              [turn, outcome] = [1, winner(faceA, faceB, tmpA)];
              continue
            }else{
              [turn, tmpB] = [1, handB];
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
      exit(); });