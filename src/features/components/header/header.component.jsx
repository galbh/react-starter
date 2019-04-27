import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import userModel from '../../../common/state/auth/auth.models';

import { Header, Title } from './styles';

const HeaderComponent = ({
  openDrawer,
  loggedInUser,
  title
}) => {
  const [t] = useTranslation();
  return (
    <div>
      <Header position="static">
        <Toolbar>
          <IconButton onClick={openDrawer} className="hamburger">
            <MenuIcon />
          </IconButton>
          <Title>{t(title)}</Title>
          {
            loggedInUser &&
            <div>{loggedInUser.username}</div>
          }
        </Toolbar>
      </Header>
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
