import React from 'react';
import './InputField.css';

const InputField = (props) => {
  let textInput = null;
  

  
  const handleChange = () => {
    console.log(textInput);
  }

  return (
    <input onChange={handleChange} ref={(input) => { textInput = input; }} className="input-field" type="text" placeholder="Search..."/>
  );
}

export default InputField;