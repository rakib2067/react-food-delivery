import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const isFiveChars = (value) => value.trim().length === 5;

export default function Checkout(props) {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalIsValid = isFiveChars(postal);
    const cityIsValid = !isEmpty(city);

    setFormInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });
    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name,
      street,
      postal,
      city,
    });
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formInputValidity.name && (
          <p className={classes["error-text"]}>Please enter a valid name!</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />
        {!formInputValidity.street && (
          <p className={classes["error-text"]}>Please enter a valid street!</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} type="text" id="postal" />
        {!formInputValidity.postal && (
          <p className={classes["error-text"]}>
            Please enter a valid post code!
          </p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formInputValidity.city && (
          <p className={classes["error-text"]}>Please enter a valid city!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}
