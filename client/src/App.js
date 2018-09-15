import React, { Component } from 'react';
import './App.css';
import TopBar from './Components/TopBar.js';
import SignUp from './Components/SignUp.js';
import SignIn from './Components/SignIn.js';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import DashBoard from './Components/DashBoard.js';
import LinkAccount from './Components/LinkAccount.js';
import MyTournaments from './Components/MyTournaments.js';
import MyTeams from './Components/MyTeams.js';
import MyInvites from './Components/MyInvites.js';
import MyOverview from './Components/MyOverview.js';
import UserSearch from './Components/UserSearch.js';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
            <React.Fragment>
              <TopBar></TopBar>
              {!this.props.token &&
                <Switch>
                  <Redirect exact from="/" to="/signup"/>
                  <Redirect from="/dashboard" to="/signin"/>
                  <Redirect from="/link" to="signin"/>
                </Switch>
              }
              {this.props.token &&
                <Switch>
                  <Redirect exact from="/" to="/dashboard"/>
                  <Redirect from="/signin" to="/dashboard"/>
                  <Redirect from="/signup" to="/dashboard"/>
                </Switch>
              }
              <Switch>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/dashboard" render={(props) => (
                  <DashBoard {...props} state={this.props}>
                    <MyOverview/>
                  </DashBoard>
                )}/>
                <Route path="/dashboard/tournaments" render={(props) => (
                  <DashBoard {...props} state={this.props}>
                    <MyTournaments/>
                  </DashBoard>
                )}/>
                <Route path="/dashboard/teams" render={(props) => (
                  <DashBoard {...props} state={this.props}>
                    <MyTeams/>
                  </DashBoard>
                )}/>
                <Route path="/dashboard/invites" render={(props) => (
                  <DashBoard {...props} state={this.props}>
                    <MyInvites/>
                  </DashBoard>
                )}/>
                <Route path="/link" render={(props) => (
                  <LinkAccount {...props} state={this.props}/>
                )}/>
                <Route path="/users" component={UserSearch}/>
              </Switch>

            </React.Fragment>

          </Router>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token
  }
}


export default connect(mapStateToProps)(App);
