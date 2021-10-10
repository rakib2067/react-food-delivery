import React, { useState, useReducer } from "react";
import cart_context from "./cart-context";
const CartContext = cart_context;

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  return { defaultCartState };
};
export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const addItem = (item, amount) => {
    dispatchCartAction({ type: "ADD" });
    setItems((previtems) => {
      return [...previtems, { ...item, amount: amount }];
    });
  };

  const removeItem = (id) => {
    setItems((previtems) => {
      return [...previtems].filter((item) => {
        return item != id;
      });
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItem,
    removeItem: removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
