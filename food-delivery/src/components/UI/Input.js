import React from "react";

export default function Input(props) {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input id={props.input.id} type={props.type} {...props.input} />
    </div>
  );
}
