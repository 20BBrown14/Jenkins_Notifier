import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

const htmlTag = document.getElementsByTagName('html')[0];
htmlTag.setAttribute('dir', 'ltr');

console.error = (message) => {
    if(!/(React.createElement: type should not be null)/.test(message)) {
        fail(message); //eslint-disable-line no-undef
    }
}