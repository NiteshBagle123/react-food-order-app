import { useEffect, useState, Fragment } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoadingMeals(true);
    const fetchMeals = async () => {
      const response = await fetch('https://react-form-app-87628-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok) {
        throw new Error('Error loading meals...!')
      }

      const responseData = await response.json();
      const loadedMeals = [];
      
      for(const key in responseData) {
        loadedMeals.push({
          id: key,
          ...responseData[key]
        });
      }
      setLoadingMeals(false);
      setMeals(loadedMeals);
    }

    fetchMeals()
      .then()
      .catch((error) => {
        setLoadingMeals(false);
        setError(error.message);
      });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <Fragment>
      {
        meals && meals.length && (
          <section className={classes.meals}>
            <Card>
              <ul>{mealsList}</ul>
            </Card>
          </section>
        )
      }
      {
        loadingMeals && (
          <section className={classes.mealsLoading}>
            <p>Loading....</p>
          </section>
        )
      }
      {
        error && (
          <section className={classes.mealsError}>
            <p>{error}</p>
          </section>
        )
      }
    </Fragment>
  );
};

export default AvailableMeals;
