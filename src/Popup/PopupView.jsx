import React from 'react';
import JobInputComponent from './JobInputComponent';
import PropTypes from 'prop-types';

const propTypes = {
    /** Error message for input */
    errorMessage: PropTypes.string.isRequired,
    /** If input is invalid */
    formInvalid: PropTypes.bool,
    /** Function to validate input */
    handleValidation: PropTypes.func.isRequired,
};

const defaultProps = {
    formInvaild: false,
};

const PopupView = (props) => {
    const {
        errorMessage,
        formInvalid,
        handleValidation,
    } = props;

    return (
        <div style={{ width: '650px', height: '450px'}}>
            <JobInputComponent
                errorMessage={errorMessage}
                isInvalid={formInvalid}
                handleValidation={handleValidation}
            />
        </div>
    )
}

PopupView.propTypes = propTypes;
PopupView.defaultProps = defaultProps;

export default PopupView;