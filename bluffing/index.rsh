'reach 0.1';

const [ isHand, ROCK, PAPER, SCISSORS, GUESS ] = makeEnum(4);
const [ isOutcome, B_WINS, DRAW, A_WINS ] = makeEnum(3);

const winner = (handA, handB) =>
  (handA == 3 ? 2 : (handB == 3  ? 1 : 0))

  

const Player =
      { ...hasRandom,
        ...hasConsoleLogger,
        guessNumOrOpen: Fun([], UInt),
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
      const DICE = 2;
      var [outcome, turn, first_call] = [DRAW, 0, 1];
      invariant(balance() == 2 * wager && isOutcome(outcome) );
      while ( outcome == 1 ) {
        if (first_call == 1){
          commit();
          A.only(() => {
            const handA = declassify(interact.guessNum())});
          A.publish(handA)
            .timeout(DEADLINE, () => closeTo(B, informTimeout));
          first_call = 0;
          continue
        }else{
          if (turn == 1){
            commit();
            A.only(() => {
              const handA = declassify(interact.guessNum())});
            A.publish(handA)
              .timeout(DEADLINE, () => closeTo(B, informTimeout));
            if (handA == 3){
              [turn, outcome] = [0, 2]
              continue
            }else{
              turn = 0
              continue
            }
            // commit();
          }else{
            commit();
            B.only(() => {
              const handB = declassify(interact.guessNumOrOpen()); });
            B.publish(handB)
              .timeout(DEADLINE, () => closeTo(A, informTimeout));
            if (handB == 3){
              [turn, outcome] = [1, 2]
              continue
            }else{
              turn = 1
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