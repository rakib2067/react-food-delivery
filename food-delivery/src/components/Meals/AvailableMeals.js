import React, { useContext, useEffect, useState } from "react";
import cart_context from "../../Context/cart-context";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
export default function AvailableMeals(props) {
  const cartContext = useContext(cart_context);
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-star-wars-api-fa8db-default-rtdb.europe-west1.firebasedatabase.app/"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();

      const loadedData = [];

      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        });
      }
      setMeals(loadedData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }
  const mealList = meals.map((meal) => {
    return (
      <MealItem
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
