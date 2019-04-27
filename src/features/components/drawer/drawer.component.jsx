import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  MenuItem,
  ExpansionPanel,
  ListItemText,
  ListItem,
  List,
  ExpansionPanelSummary
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import styles from './drawer.module.scss';
import { ROUTES } from '../../../common/constants';
import LogoComponent from '../logo/logo.component.jsx';
import ImgSrc from '../../../assets/img/logo.png';

const DrawerComponent = ({
  closeDrawer,
  open,
  languages,
  language,
  onChangeLanguage,
  isRtl
}) => {
  const [t] = useTranslation();
  return (
    <Drawer
      open={open}
      className={styles.container}
      variant="temporary"
      anchor={isRtl ? 'right' : 'left'}
      onClose={closeDrawer}
    >
      <div className={isRtl ? `${styles.rtl} ${styles.drawer}` : styles.drawer}>

        <div className={styles.logo}><LogoComponent /></div>

        <DrawerLink
          to={ROUTES.home}
          iconSrc={ImgSrc}
          label={t('HOME_PAGE')}
          closeDrawer={closeDrawer}
        />

        <DrawerLink
          to={ROUTES.about}
          iconSrc={ImgSrc}
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
                  className={language === languages[l]
                    ? `${styles.selected} ${styles.listItem}`
                    : styles.listItem
                  }
                  onClick={() => onChangeLanguage(languages[l])}
                >
                  <ListItemText primary={l} />
                </ListItem>
              ))
            }
          </List>
        </ExpansionPanel>

      </div>
    </Drawer>
  );
};

const DrawerLink = ({
  closeDrawer, iconSrc, label, to
}) => (
  <NavLink
    activeClassName={styles.active}
    to={to}
  >
    <MenuItem onClick={() => closeDrawer()}>
      <img className={styles.icon} src={iconSrc} alt={`${label} link`} />
      <span>{label}</span>
    </MenuItem>
  </NavLink>
);

DrawerLink.propTypes = {
  to: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  closeDrawer: PropTypes.func.isRequired
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
