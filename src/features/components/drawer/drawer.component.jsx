import React from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Drawer, MenuItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import styles from './drawer.component.scss';
import { routes } from '../../../common/constants';
import LogoComponent from '../logo/logo.component.jsx';
import ImgSrc from '../../../../assets/img/logo.png';
import { CloseDrawerAction } from '../../../common/state/drawer/drawer.actions';

const DrawerComponent = (props) => {
  const getClassName = route => (props.currentRoute === route ? styles.active : null);
  return (
    <Drawer
      open={props.open}
      className={styles.container}
      variant="temporary"
      onClose={() => props.dispatch(new CloseDrawerAction())}
    >
      <div className={styles.drawer}>

        <LogoComponent />

        <DrawerLink
          to={routes.empty}
          iconSrc={ImgSrc}
          label={props.t('DASHBOARD')}
          className={getClassName(routes.dashboard)}
        />

      </div>
    </Drawer>
  );
};

const DrawerLink = connect()(props => (
  <NavLink
    activeClassName={styles.active}
    to={props.to}
  >
    <MenuItem onClick={() => props.dispatch(new CloseDrawerAction())}>
      <img src={props.iconSrc} alt={`${props.label} link`} />
      <span>{props.label}</span>
    </MenuItem>
  </NavLink>
));

DrawerLink.propTypes = {
  to: propTypes.string.isRequired,
  iconSrc: propTypes.string.isRequired,
  label: propTypes.string.isRequired
};

DrawerLink.defaultProps = { className: '' };

DrawerComponent.propTypes = {
  currentRoute: propTypes.string,
  t: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
  dispatch: propTypes.func.isRequired
};

DrawerComponent.defaultProps = { currentRoute: routes.empty };

export default connect()(translate()(DrawerComponent));
