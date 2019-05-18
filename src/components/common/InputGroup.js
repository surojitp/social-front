import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  type,
  onChange,
  icon,
  info
}) => {
  return (
    <div className="input-group md-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input type={type} 
      className= {classnames("form-control form-control-lg" ,{
        'is-invalid': error
      })}
      placeholder={placeholder} 
      name={name}
      value= {value}
      onChange={onChange}
        />
        {info && <small className="from-text text-muted">{info}</small>}
        {error && <div className= "invalid-feedback">{error}</div>}
    </div>
  );
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  icon: PropTypes.string,
}

InputGroup.defaultProps = {
  type: 'text'
}
export default InputGroup;