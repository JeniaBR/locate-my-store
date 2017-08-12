import React from 'react';
import './InputField.css';

const InputField = (props) => {
    return (<input className="input-field" type="text" placeholder="Search..."/>);
}

InputField.propTypes = {
    onTextChange: React.PropTypes.func.isRequired
};

export default InputField;