import React from 'react';
import PopupView from '../../../src/Popup/PopupView';
import { mountWithIntl } from 'enzyme-react-intl'

describe('PopupView', () => {
    it('should render a default view', () => {
        const testView = (shallow(<PopupView errorMessage="someMessage" handleValidation={() => {}} />));
        expect(testView).toMatchSnapshot();
    });
});