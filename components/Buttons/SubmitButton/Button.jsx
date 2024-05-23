import React from "react";

const Button = (props) => {
  return (
    <div className="button__container">
      <button type={props.type} className={props.classname}>
        {props.button_label}
      </button>
    </div>
  );
};

export default Button;
