import React from 'react';
import App from '../src/App';

describe('App', () => {
  it('should render a default view', () => {
    const testApp = (shallow(<App />));
    expect(testApp).toMatchSnapshot();
  });
});
