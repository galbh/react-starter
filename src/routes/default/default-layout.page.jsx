import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './default-layout.page.scss';
import HeaderComponent from '../../features/components/header/header.component.jsx';
import userModel from '../../common/state/auth/auth.models';
import { OpenDrawerAction } from '../../common/state/drawer/drawer.actions';

const DefaultLayout = (props) => {
  const {
    loggedInUser, path, component, openDrawer
  } = props;

  const Component = component;

  return (
    <Route
      path={path}
      render={matchProps => (

        <div className={styles.container}>
          <HeaderComponent
            path={path}
            openDrawer={openDrawer}
            loggedInUser={loggedInUser}
          />

          <div className={styles.wrapper}>
            <Component {...matchProps} />
          </div>
        </div>

      )}
    />
  );
};

function mapStateToProps (state) {
  return {
    loggedInUser: state.auth.loggedInUser
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openDialog: (title, component) => dispatch(new OpenDrawerAction(title, component)),
    openDrawer: () => dispatch(new OpenDrawerAction())
  };
}

DefaultLayout.propTypes = {
  loggedInUser: PropTypes.shape(userModel),
  path: PropTypes.string.isRequired,
  openDrawer: PropTypes.func.isRequired,
  component: PropTypes.func
};

DefaultLayout.defaultProps = { loggedInUser: null, component: null };

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
