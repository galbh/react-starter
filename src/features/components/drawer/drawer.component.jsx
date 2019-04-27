import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {
  MenuItem,
  ExpansionPanel,
  ListItemText,
  ListItem,
  List,
  ExpansionPanelSummary
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../common/constants';
import LogoComponent from '../logo/logo.component.jsx';
import {
  StyledDrawer,
  WrapperRtl,
  Wrapper,
  Logo
} from './styles';

const DrawerComponent = ({
  closeDrawer,
  open,
  languages,
  language,
  onChangeLanguage,
  isRtl
}) => {
  const [t] = useTranslation();
  const Container = isRtl ? WrapperRtl : Wrapper;
  return (
    <StyledDrawer
      open={open}
      variant="temporary"
      anchor={isRtl ? 'right' : 'left'}
      onClose={closeDrawer}
    >
      <Container>

        <Logo><LogoComponent /></Logo>

        <DrawerLink
          to={ROUTES.home}
          icon={<HomeIcon />}
          label={t('HOME_PAGE')}
          closeDrawer={closeDrawer}
        />

        <DrawerLink
          to={ROUTES.about}
          icon={<DashboardIcon />}
          label={t('ABOUT_PAGE')}
          closeDrawer={closeDrawer}
        />

        {/* Language Switcher */}
        <ExpansionPanel style={{ margin: 0, background: 'inherit' }}>
          <ExpansionPanelSummary>{t('LANGUAGES')}</ExpansionPanelSummary>
          <List>
            {
              Object.keys(languages).map(l => (
                <ListItem
                  key={l}
                  button
                  className={language === languages[l] ? 'selected' : null}
                  onClick={() => onChangeLanguage(languages[l])}
                >
                  <ListItemText primary={l} />
                </ListItem>
              ))
            }
          </List>
        </ExpansionPanel>

      </Container>
    </StyledDrawer>
  );
};

const DrawerLink = ({
  closeDrawer, iconSrc, label, to, icon
}) => (
  <NavLink
    activeClassName="active"
    to={to}
  >
    <MenuItem onClick={() => closeDrawer()}>
      { icon }
      { !icon && iconSrc && <img src={iconSrc} alt={`${label} link`} /> }
      <span>{label}</span>
    </MenuItem>
  </NavLink>
);

DrawerLink.propTypes = {
  to: PropTypes.string.isRequired,
  iconSrc: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.string.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

DrawerLink.defaultProps = {
  iconSrc: null,
  icon: null
};

DrawerComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
  languages: PropTypes.shape({ [PropTypes.string]: PropTypes.string }).isRequired,
  language: PropTypes.string.isRequired,
  isRtl: PropTypes.bool.isRequired
};

export default DrawerComponent;
