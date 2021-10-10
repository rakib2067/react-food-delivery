import React, { useContext } from "react";
import cart_context from "../../Context/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
export default function HeaderCartButton(props) {
  const cartContext = useContext(cart_context);
  const numOfItems = cartContext.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);
  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfItems}</span>
    </button>
  );
}
