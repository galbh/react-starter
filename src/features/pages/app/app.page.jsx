import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SpinnerComponent from '../../components/spinner/spinner.component.jsx';
import DialogComponent from '../../components/dialog/dialog.component.jsx';
import DrawerComponent from '../../components/drawer/drawer.component.jsx';
import { OpenDialogAction, CloseDialogAction } from '../../../common/state/dialog/dialog.actions';
import { ROUTES } from '../../../common/constants';
import { CloseDrawerAction } from '../../../common/state/drawer/drawer.actions';
import {
  ChangeLanguageAction,
  StartLoaderAction,
  StopLoaderAction,
  SetTitleAction
} from '../../../common/state/shared/shared.actions';
import { FetchLoggedInUserAction } from '../../../common/state/auth/auth.actions';

class App extends Component {
  componentDidMount () {
    const { history, location, setTitle } = this.props;
    this.initiateData();

    // redirect to homepage if route is empty
    if (location.pathname === ROUTES.empty) {
      history.push(ROUTES.home);
    }

    // set site title on route change
    setTitle(ROUTES.home);
    history.listen(path => setTitle(path.pathname));
  }

  onChangeLanguage (language) {
    const { changeLanguage } = this.props;
    changeLanguage(language);
  }

  initiateData () {
    const {
      startLoader, stopLoader, fetchLoggedInUser, openDialog, t
    } = this.props;

    startLoader();
    fetchLoggedInUser()
      .then(() => stopLoader())
      .then(() => openDialog(t('WELCOME_TITLE'), t('WELCOME_MESSAGE')));
  }

  render () {
    const {
      isRtl, loading, children, isDialogRender, dialogComponent, closeDrawer, languages,
      dialogTitle, dialogType, isDrawerRender, closeDialog, changeLanguage, language
    } = this.props;

    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>

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
          isRtl={isRtl}
        />

        {/* Drawer menu */}
        <DrawerComponent
          open={isDrawerRender}
          languages={languages}
          language={language}
          closeDrawer={closeDrawer}
          onChangeLanguage={changeLanguage}
          isRtl={isRtl}
        />
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element.isRequired,
  isDialogRender: PropTypes.bool.isRequired,
  dialogComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  dialogTitle: PropTypes.string.isRequired,
  dialogType: PropTypes.string,
  isDrawerRender: PropTypes.bool.isRequired,
  languages: PropTypes.shape({ [PropTypes.string]: PropTypes.string }).isRequired,
  language: PropTypes.string.isRequired,
  isRtl: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

App.defaultProps = {
  loading: true,
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
    isRtl: state.shared.isRtl(),
    languages: state.shared.supportedLanguages,
    language: state.shared.language
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openDialog: bindActionCreators(OpenDialogAction, dispatch),
    closeDialog: bindActionCreators(CloseDialogAction, dispatch),
    closeDrawer: bindActionCreators(CloseDrawerAction, dispatch),
    changeLanguage: bindActionCreators(ChangeLanguageAction, dispatch),
    fetchLoggedInUser: bindActionCreators(FetchLoggedInUserAction, dispatch),
    startLoader: bindActionCreators(StartLoaderAction, dispatch),
    stopLoader: bindActionCreators(StopLoaderAction, dispatch),
    setTitle: bindActionCreators(SetTitleAction, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(App)));
