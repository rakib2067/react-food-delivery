import React from "react";

const cart_context = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  reset: () => {},
});

export default cart_context;
