import React, { useContext, useRef, useState } from "react";
import cart_context from "../../../Context/cart-context";
import Input from "../../UI/Input";
import classes from "./MealInput.module.css";
export default function MealInput(props) {
  const amountInput = useRef();
  const [isValid, setIsValid] = useState(true);
  const cartContext = useContext(cart_context);
  const addCart = (e) => {
    e.preventDefault();
    const enteredAmount = amountInput.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={addCart}>
      <Input
        ref={amountInput}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: 1,
        }}
        label="Amount"
      />
      <button type="submit">+Add</button>
      {!isValid && <p>Please enter a valid amoount (1-5)</p>}
    </form>
  );
}
