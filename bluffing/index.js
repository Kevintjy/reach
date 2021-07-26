import React from 'react';
import AppViews from './views/AppViews';
import DeployerViews from './views/DeployerViews';
import AttacherViews from './views/AttacherViews';
import {renderDOM, renderView} from './views/render';
// import './index.css';
import * as backend from './build/index.main.mjs';
import {loadStdlib} from '@reach-sh/stdlib';
const reach = loadStdlib(process.env);
const handToInt = {'ROCK': 0, 'PAPER': 1, 'SCISSORS': 2};
const intToOutcome = ['Bob wins!', 'Draw!', 'Alice wins!'];
const {standardUnit} = reach;
const defaults = {defaultFundAmt: '10', defaultWager: '3', standardUnit};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: 'ConnectAccount', ...defaults};
  }
  async componentDidMount() {
    const acc = await reach.getDefaultAccount();
    const balAtomic = await reach.balanceOf(acc);
    const bal = reach.formatCurrency(balAtomic, 4);
    this.setState({acc, bal});
    try {
      const faucet = await reach.getFaucet();
      this.setState({view: 'FundAccount', faucet});
    } catch (e) {
      this.setState({view: 'DeployerOrAttacher'});
    }
  }
  async fundAccount(fundAmount) {
    await reach.transfer(this.state.faucet, this.state.acc, reach.parseCurrency(fundAmount));
    this.setState({view: 'DeployerOrAttacher'});
  }
  async skipFundAccount() { this.setState({view: 'DeployerOrAttacher'}); }
  selectAttacher() { this.setState({view: 'Wrapper', ContentView: Attacher}); }
  selectDeployer() { this.setState({view: 'Wrapper', ContentView: Deployer}); }
  render() { return renderView(this, AppViews); }
}

class Player extends React.Component {
  random() { return reach.hasRandom.random(); }
  log(){ return reach.hasConsoleLogger.log();}
  async generateFaces() { 
    const num1 = Math.ceil(Math.random() * 6);
    const num2 = Math.ceil(Math.random() * 6);
    const num3 = Math.ceil(Math.random() * 6);
    const num4 = Math.ceil(Math.random() * 6);
    const num5 = Math.ceil(Math.random() * 6);
    const res = [num1, num2, num3, num4, num5];
    this.setState({dice: res})
    console.log(res)
    return res;
  }

  async ifChallenge(currAmount, currFace){
    currAmount = parseInt(currAmount)
    currFace = parseInt(currFace)
    const flag = await new Promise(resolveChallenge => {
        this.setState({view: 'ifChallenge', 
                    currAmount: currAmount, currFace: currFace, 
                    playable: true, resolveChallenge});
      });
      this.setState({view: 'WaitingForResults'});
    return flag
  }

  setChanllenge(flag){ return this.state.resolveChallenge(flag)}

  async ifWinner(diceA, diceB, a, f, person){
    var count = 0;
    f = parseInt(f._hex)
    for (let i=0; i<6; i++){
      if (diceA[i] == 1 || diceA[i] == f){
        count += 1;
      }
      console.log(diceA[i], f, count, diceA[i] == f)
      if (diceB[i] == 1 || diceB[i] == f){
        count += 1;
      }
      console.log(diceB[i],f,  count, diceA[i] == f)
    }
    return a>count;
  }

  async keepBidding(currAmount, currFace){
    currAmount = parseInt(currAmount)
    currFace = parseInt(currFace)
    const tmp = await new Promise(resolveAmountAndFace => {
        this.setState({view: 'keepBidding',
                        currAmount: currAmount, currFace: currFace, 
                        playable: true,
                        resolveAmountAndFace});
      });
      const amount = parseInt(tmp.split(',')[0])
      const face = parseInt(tmp.split(',')[1])
      this.setState({view: 'WaitingForResults'});
      return [amount, face]
  };

  setresolveAmountAndFace(amount, face){ this.state.resolveAmountAndFace(amount, face)}

  seeOutcome(i) { this.setState({view: 'Done', outcome: intToOutcome[i]}); }
  informTimeout() { this.setState({view: 'Timeout'}); }
}

class Deployer extends Player {
  constructor(props) {
    super(props);
    this.state = {view: 'SetWager'};
  }
  setWager(wager) { this.setState({view: 'Deploy', wager}); }
  async deploy() {
    const ctc = this.props.acc.deploy(backend);
    this.setState({view: 'Deploying', ctc});
    this.wager = reach.parseCurrency(this.state.wager); // UInt
    backend.Alice(ctc, this);
    const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
    this.setState({view: 'WaitingForAttacher', ctcInfoStr});
  }
  render() { return renderView(this, DeployerViews); }
}

class Attacher extends Player {
  constructor(props) {
    super(props);
    this.state = {view: 'Attach'};
  }
  attach(ctcInfoStr) {
    const ctc = this.props.acc.attach(backend, JSON.parse(ctcInfoStr));
    this.setState({view: 'Attaching'});
    backend.Bob(ctc, this);
  }
  async acceptWager(wagerAtomic) { // Fun([UInt], Null)
    const wager = reach.formatCurrency(wagerAtomic, 4);
    return await new Promise(resolveAcceptedP => {
      this.setState({view: 'AcceptTerms', wager, resolveAcceptedP});
    });
  }
  termsAccepted() {
    this.state.resolveAcceptedP();
    this.setState({view: 'WaitingForTurn'});
  }
  render() { return renderView(this, AttacherViews); }
}

renderDOM(<App />);