import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Drawer, MenuItem } from 'material-ui';
import { withRouter, NavLink } from 'react-router-dom';
import GroupIcon from 'material-ui/svg-icons/social/group';
import BuildIcon from 'material-ui/svg-icons/action/build';
import HomeIcon from 'material-ui/svg-icons/action/home';
import EventIcon from 'material-ui/svg-icons/action/event';
import AutoReNew from 'material-ui/svg-icons/action/autorenew';
import LogOut from 'material-ui/svg-icons/action/exit-to-app';
import userModel from '../../../common/state/auth/auth.models';
import { CloseDrawerAction } from '../../../common/state/drawer/drawer.actions';
import { ChangeLanguageAction } from '../../../common/state/shared/shared.actions';
import styles from './drawer.component.scss';
import { SignOutAction } from '../../../common/state/auth/auth.actions';

const DrawerComponent = props => (
  <Drawer
    open={props.open}
    openSecondary={props.openSecondary}
    docked={false}
    className={styles.drawer}
    onRequestChange={e => props.dispatch(new CloseDrawerAction())}
  >
    <div className={styles.header}>
      {
        props.loggedInUser &&
        <div className={styles.userInfo}>
          <div className={styles.name}>
            {props.loggedInUser.firstName} {props.loggedInUser.lastName}
          </div>
          <div className={styles.email}>{props.loggedInUser.email}</div>
        </div>
      }
    </div>
    {
      props.loggedInUser && props.loggedInUser.utilityId &&
      <span className="main-menu">
        <NavLink tabIndex={0} activeClassName={styles.activeListItem} to="/utility">
          <MenuItem
            className={`${styles.listItem} list-item`}
            primaryText={props.t('common:HOME_PAGE')}
            leftIcon={<HomeIcon />}
            onClick={() => props.dispatch(new CloseDrawerAction())}
          />
        </NavLink>
        <NavLink
          tabIndex={0}
          to="/power-flow-event/create"
          activeClassName={styles.activeListItem}
        >
          <MenuItem
            leftIcon={<EventIcon />}
            className={`${styles.listItem} list-item`}
            primaryText={`${props.t('common:POWER_FLOW_EVENT')}`}
            onClick={() => props.dispatch(new CloseDrawerAction())}
          />
        </NavLink>
        <NavLink tabIndex={0} activeClassName={styles.activeListItem} to="/group">
          <MenuItem
            className={`${styles.listItem} list-item`}
            primaryText={props.t('common:GROUP_MANAGEMENT')}
            leftIcon={<GroupIcon />}
            onClick={() => props.dispatch(new CloseDrawerAction())}
          />
        </NavLink>
        <NavLink tabIndex={0} activeClassName={styles.activeListItem} to="/admin">
          <MenuItem
            className={`${styles.listItem} list-item`}
            primaryText={props.t('common:ADMIN_SECTION')}
            leftIcon={<BuildIcon />}
            onClick={() => props.dispatch(new CloseDrawerAction())}
          />
        </NavLink>
        <NavLink exact tabIndex={0} activeClassName={styles.activeListItem} to="/">
          <MenuItem
            className={`${styles.listItem} list-item`}
            primaryText={props.t('common:SWITCH_UTILITY')}
            leftIcon={<AutoReNew />}
            onClick={() => props.dispatch(new CloseDrawerAction())}
          />
        </NavLink>
        <MenuItem
          className={`${styles.listItem} list-item`}
          primaryText={props.t('common:LOG_OUT')}
          leftIcon={<LogOut />}
          onClick={() => {
            props.dispatch(new SignOutAction())
              .then(() => { window.location.href = '/login/index.html'; });
          }}
        />
      </span>
    }
    <MenuItem
      tabIndex={0}
      className={`${styles.listItem} list-item`}
      primaryText={props.t('common:LANGUAGES')}
      primaryTogglesNestedList
      nestedItems={
        props.languages && Object.keys(props.languages).map(l => (
          <MenuItem
            key={l}
            primaryText={l}
            className={props.language === props.languages[l]
              ? `${styles.activeListItem} list-item` : `${styles.listItem} list-item`}
            onClick={() => {
              props.dispatch(new CloseDrawerAction());
              props.dispatch(new ChangeLanguageAction(props.languages[l]));
            }}
          />
        ))
      }
    />
  </Drawer>
);

DrawerComponent.propTypes = {
  open: propTypes.bool.isRequired,
  openSecondary: propTypes.bool.isRequired,
  languages: propTypes.shape({ [propTypes.string]: propTypes.string }).isRequired,
  language: propTypes.string.isRequired,
  dispatch: propTypes.func.isRequired,
  loggedInUser: propTypes.shape(userModel),
  t: propTypes.func.isRequired
};

DrawerComponent.defaultProps = { loggedInUser: null };

function mapStateToProps (state) {
  return {
    loggedInUser: state.auth.loggedInUser,
    languages: state.shared.supportedLanguages,
    language: state.shared.language
  };
}

export default withRouter(connect(mapStateToProps)(translate()(DrawerComponent)));
