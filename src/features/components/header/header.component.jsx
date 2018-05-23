import React from 'react';
import propTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import styles from './header.component.scss';
import LogoComponent from '../logo/logo.component.jsx';
import { OpenDrawerAction } from '../../../common/state/drawer/drawer.actions';

const HeaderComponent = props => (
  <AppBar
    className={styles.header}
    onLeftIconButtonClick={e => props.dispatch(new OpenDrawerAction())}
    title={(
      <div className={`${styles.title} header-title`}>
        {props.t(props.title)}
      </div>
    )}
  >
    <LogoComponent />
  </AppBar>
);

HeaderComponent.propTypes = {
  dispatch: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  t: propTypes.func.isRequired
};

export default connect()(translate()(HeaderComponent));
