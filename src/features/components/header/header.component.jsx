import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { useTranslation } from 'react-i18next';
import { Toolbar, Icon, IconButton } from '@material-ui/core';
import styles from './header.component.scss';
import userModel from '../../../common/state/auth/auth.models';

const HeaderComponent = ({
  openDrawer,
  loggedInUser,
  title
}) => {
  const [t] = useTranslation();
  return (
    <div>
      <AppBar position="static" className={styles.header}>
        <Toolbar>
          <IconButton onClick={openDrawer} className="hamburger">
            <Icon>menu</Icon>
          </IconButton>
          <div className={styles.title} style={{ flexGrow: 1 }}>{t(title)}</div>
          {
            loggedInUser &&
            <div>{loggedInUser.username}</div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

HeaderComponent.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  loggedInUser: PropTypes.shape(userModel),
  title: PropTypes.string
};

HeaderComponent.defaultProps = { loggedInUser: null, title: '' };

export default HeaderComponent;
