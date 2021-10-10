import React, { useContext } from "react";
import cart_context from "../../Context/cart-context";
import classes from "./Cart.module.css";
import Modal from "./Modal";
export default function Cart(props) {
  const cartContext = useContext(cart_context);
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((item) => {
        return <li>{item.name}</li>;
      })}
    </ul>
  );
  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartContext.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.closeCart} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}
