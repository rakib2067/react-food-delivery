import React from "react";
import Input from "../../UI/Input";
import classes from "./MealInput.module.css";
export default function MealInput(props) {
  return (
    <form className={classes.form} action="">
      <Input
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        label="Amount"
      />
      <button>+Add</button>
    </form>
  );
}
