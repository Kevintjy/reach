import React from 'react';

const exports = {};

// Player views must be extended.
// It does not have its own Wrapper view.

exports.ifChallenge = class extends React.Component {
  render() {
    const {parent, playable, currAmount, currFace} = this.props;
    return (
      <div>
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
      return (
        <div>
          {!playable ? 'Please wait...' : ''}
          <br />
          current amount = {currAmount}
          <br />
          current face = {currFace}
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
            parent.state.resolveAmountAndFace(
              this.state.amount.toString() + ',' + this.state.face.toString()) 
          }}
        >submit</button>
        </div>
      );
    }
  }

exports.WaitingForResults = class extends React.Component {
  render() {
    return (
      <div>
        Waiting for results...
      </div>
    );
  }
}

exports.Done = class extends React.Component {
  render() {
    const {outcome} = this.props;
    return (
      <div>
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