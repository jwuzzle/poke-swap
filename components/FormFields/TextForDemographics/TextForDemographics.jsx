import React from "react";

const TextForDemographics = (props) => {
  return (
    <div className="signup__input">
      <label className="signup__label">{props.label}</label>
      <input type="text" name={props.label_name} />
    </div>
  );
};

export default TextForDemographics;
