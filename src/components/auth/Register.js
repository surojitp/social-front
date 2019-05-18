import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {registeruser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
       this.setState({errors: nextProps.errors})
    }
  }
  onChange = (e) =>{
    //console.log(e);
    this.setState({
      //name: "Sur"
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registeruser(newUser, this.props.history);
    //console.log(JSON.stringify(newUser));
    // let axiosConfig = {
    //   headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //       "Access-Control-Allow-Origin": "*",
    //   }
    // };

    
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:5000/api/users/register',
    //   // headers: {
    //   //   'Content-Type': 'application/json',
    //   //   "Access-Control-Allow-Origin": "*",
    //   // },
    //   data: newUser
    // })
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
    
  }

  render() {

    const {errors} = this.state;
    
    return (
      <div className="register">
        
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit= {this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  name="name"
                  value= {this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                {/* <div className="form-group">
                  <input type="text" 
                  className={classnames('form-control form-control-lg',{
                    'is-invalid': errors.name
                  })} 
                  placeholder="Name" name="name"
                  value= {this.state.name}
                  onChange= {this.onChange}
                   />
                   {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div> */}
                <TextFieldGroup
                 type="email"
                 placeholder="Email Address"
                 name="email"
                 value= {this.state.email}
                 onChange={this.onChange}
                 error={errors.email}
                />
                {/* <div className="form-group">
                  <input type="email" 
                  className={classnames('form-control form-control-lg',{
                    'is-invalid': errors.email
                  })} 
                  placeholder="Email Address" name="email"
                  value= {this.state.email}
                  onChange= {this.onChange}
                   />
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div> */}
                <TextFieldGroup
                 type="password"
                 placeholder="Password"
                 name="password"
                 value= {this.state.password}
                 onChange={this.onChange}
                 error={errors.password}
                />
                
                {/* <div className="form-group">
                  <input type="password" 
                  className={classnames('form-control form-control-lg',{
                    'is-invalid': errors.password
                  })}
                  placeholder="Password" name="password"
                  value= {this.state.password}
                  onChange= {this.onChange}
                   />
                   {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div> */}
                <TextFieldGroup
                 type="password"
                 placeholder="Confirm Password"
                 name="password2"
                 value= {this.state.password2}
                 onChange={this.onChange}
                 error={errors.password2}
                 
                />
                
                {/* <div className="form-group">
                  <input type="password" 
                  className={classnames('form-control form-control-lg',{
                    'is-invalid': errors.password2
                  })} 
                  placeholder="Confirm Password" name="password2"
                  value= {this.state.password2}
                  onChange= {this.onChange}
                   />
                   {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                </div> */}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Register.propTypes ={
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps ,{registeruser})(withRouter(Register));