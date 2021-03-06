import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import ProfileActions from './ProfileActions';
import Spinner from '../common/spinner'


class Dashboard extends Component {
  componentDidMount = () => {
    console.log(111111);
    
    this.props.getCurrentProfile();
    
  }
  onDeleteClick = () => {
    this.props.deleteAccount()
  }
  
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if(profile === null || loading){
      dashboardContent = <Spinner />
    }else{
      // Check logedin user has profile data
      if(Object.keys(profile).length > 0){
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome 
              <Link to={`profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            {/*TODO: exp edu */}
            <div style={{marginBottom: '60px'}} />
            <button onClick={this.onDeleteClick} className="btn btn-danger">
              Delete My Account
            </button>
          </div>
        )
      }
      else{
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup your profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
      
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="dispaly-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
          
          
        </div>
        
      </div>
    )
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);