import React from 'react'; // eslint-disable-line no-unused-vars
import { mount } from 'enzyme';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18nForTest';
import HeaderComponent from './header.component.jsx';

describe('HeaderComponent', () => {
  let wrapper;
  const openDrawer = jasmine.createSpy('openDrawer');

  beforeEach(() => {
    const component = (
      <I18nextProvider i18n={i18n}>
        <HeaderComponent title="test" openDrawer={openDrawer} />
      </I18nextProvider>
    );
    wrapper = mount(component);
  });

  it('should contain menu button', () => {
    expect(wrapper.find('.hamburger').length).toBeTruthy();
  });

  it('should activate a callback on menu button click', () => {
    const menuButton = wrapper.find('.hamburger').first();
    menuButton.simulate('click');
    expect(openDrawer).toHaveBeenCalled();
  });
});
