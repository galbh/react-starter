import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './app.page.scss';
import SpinnerComponent from './features/components/spinner/spinner.component.jsx';
import DialogComponent from './features/components/dialog/dialog.component.jsx';
import DrawerComponent from './features/components/drawer/drawer.component.jsx';
import { OpenDialogAction, CloseDialogAction } from './common/state/dialog/dialog.actions';
import { ROUTES } from './common/constants';
import { CloseDrawerAction } from './common/state/drawer/drawer.actions';

class App extends Component {
  componentDidMount () {
    this.initiateData();
    // redirect to homepage if route is empty
    if (this.props.location.pathname === ROUTES.empty) {
      this.props.history.push(ROUTES.home);
    }
  }

  initiateData () {
    this.props.openDialog('react starter', 'hello from app.component.jsx');
  }

  render () {
    const {
      isRtl, loading, children, isDialogRender, dialogComponent, closeDrawer,
      dialogTitle, dialogType, isDrawerRender, location, closeDialog
    } = this.props;

    return (
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className={styles.container}
      >
        {/* Loader */}
        {loading && <SpinnerComponent />}

        {/* Routes */}
        {children}

        {/* Dialog */}
        <DialogComponent
          open={isDialogRender}
          title={dialogTitle}
          type={dialogType}
          closeDialog={closeDialog}
          component={dialogComponent || ''}
        />

        {/* Drawer menu */}
        <DrawerComponent
          open={isDrawerRender}
          openSecondary={isRtl}
          closeDrawer={closeDrawer}
          currentRoute={location.pathname}
        />
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  isDialogRender: PropTypes.bool.isRequired,
  dialogComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  dialogTitle: PropTypes.string.isRequired,
  dialogType: PropTypes.string,
  isDrawerRender: PropTypes.bool.isRequired,
  isRtl: PropTypes.bool.isRequired,
  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  // from react router
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

App.defaultProps = {
  dialogComponent: '',
  dialogType: null
};

function mapStateToProps (state) {
  return {
    loading: state.shared.loading,
    isDialogRender: state.dialog.isRender,
    dialogTitle: state.dialog.title,
    dialogComponent: state.dialog.component,
    dialogType: state.dialog.type,
    isDrawerRender: state.drawer.isRender,
    isRtl: state.shared.isRtl()
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openDialog: (title, component) => dispatch(new OpenDialogAction(title, component)),
    closeDialog: (title, component) => dispatch(new CloseDialogAction()),
    closeDrawer: (title, component) => dispatch(new CloseDrawerAction())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
