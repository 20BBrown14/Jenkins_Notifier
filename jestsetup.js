/* eslint-disable import/no-extraneous-dependencies */
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
/* eslint-enable import/no-extraneous-dependencies */

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
/* eslint-disable import/no-extraneous-dependencies */
global.fetch = require('jest-fetch-mock');
/* eslint-enable import/no-extraneous-dependencies */

const htmlTag = document.getElementsByTagName('html')[0];
htmlTag.setAttribute('dir', 'ltr');

// eslint-disable-next-line no-console
console.error = (message) => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
    fail(message); // eslint-disable-line no-undef
  }
};
