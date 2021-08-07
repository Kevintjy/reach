import React from 'react';
import a from '../dices/f1.png';
import b from '../dices/f2.png';
import c from '../dices/f3.png';
import d from '../dices/f4.png';
import e from '../dices/f5.png';
import f from '../dices/f6.png';



const exports = {};
const MAPDICE = {1: a, 2: b, 3: c, 4: d, 5: e, 6: f};

// Player views must be extended.
// It does not have its own Wrapper view.
exports.allDices = class extends React.Component {
  render(){
    return <div>all dices ha!</div>
  }
}


exports.ifChallenge = class extends React.Component {
  render() {
    const {parent, playable, currAmount, currFace} = this.props;
    console.log(parent.state.ifDice)
    console.log(parent.state.dice)
    return (
      <div>
        {parent.state.dice.map((item) => {
          return <img src={MAPDICE[item]}></img>
        })}
        {!playable ? 'Please wait...' : ''}
        <br />
        current amount = {currAmount}
        <br />
        current face = {currFace}
        <button
          disabled={!playable}
          onClick={() => parent.setChanllenge(1)}
        >yes</button>
        <button
          disabled={!playable}
          onClick={() => parent.setChanllenge(0)}
        >no</button>
      </div>
    );
  }
}

exports.keepBidding = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
      const {parent, playable, currAmount, currFace} = this.props;
      console.log(parent)
      return (
        <div>
          {parent.state.dice.map((item) => {
            
          return <img src={MAPDICE[item]}></img>
        })}
          {!playable ? 'Please wait...' : ''}
          <br />
          current amount = {currAmount}
          <br />
          current face = {currFace}
          <br/>
          amount
          <input
            type="number"
            disabled={!playable}
            onChange={(e) => this.setState({amount: e.target.value})}
          />face
          <input
            type="number"
            disabled={!playable}
            onChange={(e) => this.setState({face: e.target.value})}
          />
            <button
          disabled={!playable}
          onClick={() => {
            console.log('button click', this.state)
            console.log(parent)
            if(this.state.face < currFace || this.state.amount < currAmount 
              || (this.state.face == currFace && this.state.amount == currAmount)){
                alert("invalid bid")
              }
            else{parent.state.resolveAmountAndFace(
              this.state.amount.toString() + ',' + this.state.face.toString()) 
          }}}
        >submit</button>
        </div>
      );
    }
  }

exports.WaitingForResults = class extends React.Component {
  render() {
    const {parent} = this.props
    console.log(parent)
    return (
      <div>
        {parent.state.dice.map((item) => {
          return <img src={MAPDICE[item]}></img>
        })}
        Waiting for results...
      </div>
    );
  }
}

exports.Done = class extends React.Component {
  render() {
    const {outcome, parent} = this.props;
    console.log(parent)
    return (
      <div>
        <br/>{parent.state.DICEA.map((item) => {
            
            return <img src={MAPDICE[item]}></img>
          })}
        <br/>{parent.state.DICEB.map((item) => {
            
            return <img src={MAPDICE[item]}></img>
          })}
        Thank you for playing. The outcome of this game was:
        <br />{outcome || 'Unknown'}
      </div>
    );
  }
}

exports.Timeout = class extends React.Component {
  render() {
    return (
      <div>
        There's been a timeout. (Someone took too long.)
      </div>
    );
  }
}

export default exports;