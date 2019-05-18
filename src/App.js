import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentuser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions';

import PrivateRoute from './components/common/privateRoute';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/Create-profile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credential/AddExperience';
import AddEducation from './components/add-credential/AddEducation';


import './App.css';

// check for token
if(localStorage.jwtToken){
  //set auth token to header
  setAuthToken(localStorage.jwtToken)
  // decode token
  const decode = jwt_decode(localStorage.jwtToken)
  //set user and isAuthenticated
  store.dispatch(setCurrentuser(decode))

  //check for expired token
  const currentTime = Date.now() / 1000;
  if(decode.exp < currentTime){
    //logout user
    store.dispatch(logoutUser())
    //Clear current profile
    store.dispatch(clearCurrentProfile())
    //redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store= {store}>
        <Router>
         <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route path="/landing" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Switch>
               <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
               <PrivateRoute path="/create-profile" component={CreateProfile} />
              </Switch>

              <Switch>
               <PrivateRoute path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
               <PrivateRoute path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
               <PrivateRoute path="/add-education" component={AddEducation} />
              </Switch>
              
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
      
     
    );
  }
}

export default App;
