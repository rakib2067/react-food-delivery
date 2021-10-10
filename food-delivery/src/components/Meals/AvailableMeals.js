import React, { useContext } from "react";
import cart_context from "../../Context/cart-context";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
export default function AvailableMeals(props) {
  const cartContext = useContext(cart_context);
  const DUMMY_MEALS = [
    {
      id: "m1",
      name: "Sushi",
      description: "Finest fish and veggies",
      price: 22.99,
    },
    {
      id: "m2",
      name: "Schnitzel",
      description: "A german specialty!",
      price: 16.5,
    },
    {
      id: "m3",
      name: "Barbecue Burger",
      description: "American, raw, meaty",
      price: 12.99,
    },
    {
      id: "m4",
      name: "Green Bowl",
      description: "Healthy...and green...",
      price: 18.99,
    },
  ];
  const mealList = DUMMY_MEALS.map((meal) => {
    return (
      <MealItem
        item={meal}
        id={meal.id}
        price={meal.price}
        description={meal.description}
        key={meal.id}
        name={meal.name}
      />
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
}
