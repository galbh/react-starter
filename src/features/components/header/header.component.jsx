import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Icon, IconButton } from '@material-ui/core';
import styles from './header.component.scss';

const HeaderComponent = ({ openDrawer }) => (
  <div>
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <IconButton onClick={() => openDrawer()}>
          <Icon className={styles.hamburgerBtn}>menu</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  </div>
);

HeaderComponent.propTypes = {
  openDrawer: PropTypes.func.isRequired
};

export default HeaderComponent;
