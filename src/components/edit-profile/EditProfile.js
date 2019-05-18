import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import {createProfile, getCurrentProfile} from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty'

class EditProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps){
    console.log("neeee", nextProps);
    
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }

    if(nextProps.profile.profile){
      const profile = nextProps.profile.profile;
      //Brings skills array back to csv
      const skillsCSV = profile.skills.join(',');

      // if profile field does not exist make it empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};

      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

      // set component field state
      this.setState({
        displaySocialInputs: !isEmpty(profile.social) ? true : false,
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      })

    }
  }
  onSubmit = (e) =>{
    e.preventDefault();
    let profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    }
    
    //console.log(profileData);
    this.props.createProfile(profileData, this.props.history);
    
  }
  onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  render(){
    const {errors, displaySocialInputs} = this.state;
    let socialInputs;
    if(displaySocialInputs){
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            error={errors.twitter}
            onChange = {this.onChange}
          />
          <div style={{marginBottom: '10px'}} />
          <InputGroup
            placeholder="Facebook page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange = {this.onChange}
            error={errors.facebook}
          />
          <div style={{marginBottom: '10px'}} />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange = {this.onChange}
            error={errors.linkedin}
          />
          <div style={{marginBottom: '10px'}} />
          <InputGroup
            placeholder="YuoTube chanel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange = {this.onChange}
            error={errors.youtube}
          />
          <div style={{marginBottom: '10px'}} />
          <InputGroup
            placeholder="Instagram page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange = {this.onChange}
            error={errors.instagram}
          />
          <div style={{marginBottom: '10px'}} />
        </div>
      )
    }
    //Select option for status
    const options = [
      {label: '* Select professional staus', value: 0},
      {label: 'Developer', value: 'Developer'},
      {label: 'Junior Developer', value: 'Junior Developer'},
      {label: 'Senior Developer', value: 'Senior Developer'},
      {label: 'Manager', value: 'Manager'},
      {label: 'Student', value: 'Student'},
      {label: 'Teacher', value: 'Teacher'},
      {label: 'Intern', value: 'Intern'},
      {label: 'Other', value: 'Other'},
    ]
    return(
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center"> Edit your profile </h1>
               <small className="d-block pb-3">* = Required field</small>
               <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc(This can't be change)"
                />
                <SelectListGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.handle}
                  info="Give us idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or acompany one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Kolkata, WB)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma seperated value (eg.HTML,PHP,Javascript)"
                />
                <TextFieldGroup
                  placeholder="Github user name"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us little about yourself"
                />
                <div className="mb-3">
                  <button
                  type="button"
                  onClick={() => {
                    this.setState(prevState =>({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }))
                  }}
                  className="btn btn-light"
                  >Add Social Network Links</button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                
                <button type="submit" className="btn btn-primary" value="submit">Submit</button>
                
               </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})
export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));