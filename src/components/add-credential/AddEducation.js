import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addEducation} from '../../actions/profileActions';

class AddEducation extends Component {
  constructor(props){
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }
    this.props.addEducation(eduData, this.props.history);
  }
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  onCheck = (e) =>{
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }
  render() {
    const {errors} = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 auto">
              <Link to="/dashboard" className="btn btn-light">
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pn-3">* = Required field</small>
              <form onSubmit = {this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="* School"
                  name="school"
                  value= {this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="* Degree"
                  name="degree"
                  value= {this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Fieldofstudy"
                  name="fieldofstudy"
                  value= {this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <h6>From date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value= {this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value= {this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled = {this.state.disabled ? 'disabled' : ''}
                />
                <div className="from-check md-4">
                  <input
                  type="checkbox"
                  className="from-check-input"
                  name="current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.onCheck}
                  id="current"
                  />
                  <label htmlFor= "current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the position"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  profile: state.profile,
  errors: state.errors
})
export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));