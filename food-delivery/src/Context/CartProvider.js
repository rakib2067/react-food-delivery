import React, { useState, useReducer } from "react";
import cart_context from "./cart-context";
const CartContext = cart_context;

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    //this is the current total amount in addition to the amount of the item added
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); //we find the index of the item that was added in the previous state using its id
    const exisitingItem = state.items[existingItemIndex];
    //we then find the index element of that item
    let updatedItems; //this will hold an array of the updated items in the cart
    if (exisitingItem) {
      //if the item already exists in the cart
      const updatedItem = {
        ...exisitingItem,
        amount: exisitingItem.amount + action.item.amount,
      }; //we will create a variable with the updated values for that existing item
      updatedItems = [...state.items]; //we then copy the current cart to updateditems
      updatedItems[existingItemIndex] = updatedItem; //we then updadte the existing item with the updatedItem
    } else {
      updatedItems = state.items.concat(action.item);
      //otherwise, if the added Item is a new Item we will just set updatedItems to
      //an array where we concatenate the existing items array with the new item
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
    //we then return both the updated total amount and the updated items array as an object
  }
  if (action.type === "REMOVE") {
    const selectedItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const selectedItem = state.items[selectedItemIndex];
    const updatedTotalAmount = state.totalAmount - selectedItem.price;
    let updatedItems;
    if (selectedItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      const updatedItem = { ...selectedItem, amount: selectedItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[selectedItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "RESET") {
    return defaultCartState;
  }
  return { defaultCartState };
};
export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItem = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItem = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const reset = () => {
    dispatchCartAction({ type: "RESET" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItem,
    removeItem: removeItem,
    reset,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
