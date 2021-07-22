import React from 'react';
import AppViews from './views/AppViews';
import DeployerViews from './views/DeployerViews';
import AttacherViews from './views/AttacherViews';
import {renderDOM, renderView} from './views/render';
import './index.css';
import * as backend from './build/index.main.mjs';
import {loadStdlib} from '@reach-sh/stdlib';
const reach = loadStdlib(process.env);
const DICE = {1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6'};
const inttoOutcome = ['draw', 'check', 'aln wins', 'kv wins',];
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

    async skipFundAccount() { 
        this.setState({view: 'DeployerOrAttacher'}); 
    }
    selectAttacher() { 
        this.setState({view: 'Wrapper', ContentView: Attacher}); 
    }
    selectDeployer() { 
        this.setState({view: 'Wrapper', ContentView: Deployer}); 
    }
    render() { 
        return renderView(this, AppViews); 
    }
}

class Player extends React.Component {
    random(){
        return reach.hasRandom.random();
    }
    async getAllDice(){ //get al dices based on the info sent from backend
        const generatedDiceIndices = await new Promise(resolveDice => {
            this.setState({view: 'GetDice', playable: true, resolveDice});
          });
          this.setState({view: 'WaitingForResults', generatedDiceIndices});
        return 0;
    }

    seeOutcome(i) { this.setState({view: 'Done', outcome: intToOutcome[i]}); }
    informTimeout() { this.setState({view: 'Timeout'}); }
    playHand(hand) { this.state.resolveHandP(hand); }
}