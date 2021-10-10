import React, { useContext, useState } from "react";
import cart_context from "../../../Context/cart-context";
import Input from "../../UI/Input";
import classes from "./MealInput.module.css";
export default function MealInput(props) {
  const [value, setValue] = useState(1);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const cartContext = useContext(cart_context);
  const addCart = (e) => {
    e.preventDefault();
    cartContext.addItem(props.item, value);
  };
  return (
    <form className={classes.form} onSubmit={addCart}>
      <Input
        onChange={handleChange}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: value,
        }}
        label="Amount"
      />
      <button type="submit">+Add</button>
    </form>
  );
}
