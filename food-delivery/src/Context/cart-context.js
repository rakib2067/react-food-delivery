import React from "react";

const cart_context = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item, amount) => {},
  removeItem: (id) => {},
});

export default cart_context;
