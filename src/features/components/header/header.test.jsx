import React from 'react'; // eslint-disable-line no-unused-vars
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import rootReducer from '../../../common/reducers';
import i18n from '../../../../i18n';
import HeaderComponent from './header.component.jsx';

const store = createStore(rootReducer, applyMiddleware(thunk));

const withMui = component => (
  <Router>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <MuiThemeProvider>{component}</MuiThemeProvider>
      </Provider>
    </I18nextProvider>
  </Router>
);

describe('HeaderComponent', () => {
  let component;

  beforeEach(() => {
    component = mount(withMui(<HeaderComponent title="test" />));
  });

  it('should display title', () => {
    expect(component.find('.header-title').text()).toBe('test');
  });
});
