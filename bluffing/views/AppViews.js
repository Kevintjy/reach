import React from 'react';
import '../index.css';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CustomizedDialogs from './CustomizedDialogs';

const exports = {};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="App">
        <header className="App-header" id="root">
          <h1>Liar's dice</h1>
          <CustomizedDialogs ></CustomizedDialogs>
          {content}
        </header>
      </div>
    );
  }
}

exports.ConnectAccount = class extends React.Component {
  render() {
    return (
      <div>
        Please wait while we connect to your account.
        If this takes more than a few seconds, there may be something wrong.
      </div>
    )
  }
}

exports.FundAccount = class extends React.Component {
  render() {
    const {bal, standardUnit, defaultFundAmt, parent} = this.props;
    const amt = (this.state || {}).amt || defaultFundAmt;
    return (
      <div>
        <h2>Fund account</h2>
        <br />
        Balance: {bal} {standardUnit}
        <hr />
        Would you like to fund your account with additional {standardUnit}?
        <br />
        (This only works on certain devnets)
        <br />
        <input
          type='number'
          placeholder={defaultFundAmt}
          onChange={(e) => this.setState({amt: e.currentTarget.value})}
        />
        <button onClick={() => parent.fundAccount(amt)}>Fund Account</button>
        <button onClick={() => parent.skipFundAccount()}>Skip</button>
      </div>
    );
  }
}

exports.DeployerOrAttacher = class extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
}   
render(){
  var {parent, data} = this.props;
  if(!data){
    data = []
  }
  console.log(data)
  return (
    <React.Fragment>
    <CssBaseline />
    <main>
      <div>
        <Container maxWidth="sm">
          <div>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button onClick={()=> parent.selectDeployer('public')} variant="contained" color="primary">
                  Create Public Game
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={()=> parent.selectDeployer('private')} variant="contained" color="primary">
                  Create Private Game
                </Button>
              </Grid>
              <Grid item>
                <input type="number" onChange={(e) => this.setState({room: e.target.value})}></input>
                <Button variant="contained" color="primary" onClick={()=> parent.selectAttacher(this.state.room)}>join</Button>
              </Grid>
              
            </Grid>
          </div>
        </Container>
      </div>
      <Container maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {data.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Game {item.id}
                  </Typography>
                  <Typography>
                    required wager: {item.wager}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={()=> parent.selectAttacher(item.id)} size="small" color="primary">
                    Join
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  </React.Fragment>
  );
}
}
    
    

export default exports;