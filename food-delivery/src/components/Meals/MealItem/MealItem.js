import React, { useContext } from "react";
import cart_context from "../../../Context/cart-context";
import MealInput from "./MealInput";
import classes from "./MealItem.module.css";
export default function MealItem(props) {
  const cartContext = useContext(cart_context);
  const price = `$${props.price.toFixed(2)}`;
  const addToCart = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      price: props.price.toFixed(2),
      amount: amount,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealInput onAddToCart={addToCart} id={props.id} />
      </div>
    </li>
  );
}
