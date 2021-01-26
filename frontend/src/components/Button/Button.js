import React from 'react';
import PropTypes from 'prop-types';
// import './Button.css';

function Button({
  buttonText,
  buttonClass,
  handleClick,
  id,
}) {
  return (
    <button type="button" className={`reusableButton ${buttonClass}`} id={id} onClick={handleClick}>{buttonText}</button>
  );
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonClass: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.any,
};

Button.defaultProps = {
  buttonClass: '',
  id: undefined,
};

export default Button;
