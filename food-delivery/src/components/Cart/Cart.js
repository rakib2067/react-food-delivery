import React, { useContext, useState } from "react";
import cart_context from "../../Context/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Modal from "./Modal";
export default function Cart(props) {
  const [isOrdering, setIsOrdering] = useState(false);
  const cartContext = useContext(cart_context);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const handleOrder = (event) => {
    setIsOrdering(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            amount={item.amount}
            name={item.name}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.closeCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );

  const cancelOrder = () => {
    setIsOrdering(false);
  };
  const submitOrderHandler = (userData) => {
    fetch(
      "https://react-star-wars-api-fa8db-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartContext.items,
        }),
      }
    );
  };
  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrdering && (
        <Checkout onConfirm={submitOrderHandler} onClose={cancelOrder} />
      )}
      {!isOrdering && modalActions}
    </Modal>
  );
}
