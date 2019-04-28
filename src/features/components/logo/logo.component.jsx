import React from 'react';
import PropTypes from 'prop-types';
import LogoSrc from '../../../assets/img/logo.png';
import Logo from './styles';

const LogoComponent = ({ onClick }) => (
  <Logo role="presentation" onClick={onClick}>
    <img src={LogoSrc} alt="logo" />
  </Logo>
);

LogoComponent.propTypes = {
  onClick: PropTypes.func
};

LogoComponent.defaultProps = { onClick: () => {} };

export default LogoComponent;
