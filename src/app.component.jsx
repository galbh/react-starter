import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import styles from './app.component.scss';
import SpinnerComponent from './features/components/spinner/spinner.component.jsx';
import DialogComponent from './features/components/dialog/dialog.component.jsx';
import DrawerComponent from './features/components/drawer/drawer.component.jsx';
import { OpenDialogAction } from './common/state/dialog/dialog.actions';

class App extends Component {
  componentDidMount () {
    this.initiateData();
  }

  initiateData () {
    this.props.dispatch(new OpenDialogAction('hello world'), <div>hello world</div>);
  }

  render () {
    const { isRtl, loading, children } = this.props;
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
          open={this.props.isDialogRender}
          title={this.props.dialogTitle}
          type={this.props.dialogType}
          component={this.props.dialogComponent}
        />

        {/* Drawer menu */}
        <DrawerComponent
          open={this.props.isDrawerRender}
          openSecondary={this.props.isRtl}
        />
      </div>
    );
  }
}

App.propTypes = {
  loading: propTypes.bool.isRequired,
  children: propTypes.element.isRequired,
  isDialogRender: propTypes.bool.isRequired,
  dialogComponent: propTypes.oneOfType([propTypes.element, propTypes.string]),
  dialogTitle: propTypes.string.isRequired,
  dialogType: propTypes.string,
  isDrawerRender: propTypes.bool.isRequired,
  isRtl: propTypes.bool.isRequired,
  dispatch: propTypes.func.isRequired
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
export default withRouter(connect(mapStateToProps)(App));
