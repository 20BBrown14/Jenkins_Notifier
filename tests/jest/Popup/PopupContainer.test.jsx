import React from 'react';
import { PopupContainer } from '../../../src/Popup/PopupContainer';

describe('PopupContainer', ()  => {
    describe('Initialization', () => {
        it('should render a default view', () => {
            const testContainer = (shallow(<PopupContainer inputValidationFailed={ () => {} } />));
            expect(testContainer).toMatchSnapshot();
        });
    });
});