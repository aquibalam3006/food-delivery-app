import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext)

  if (!food_list || food_list.length === 0) {
    return <p>Loading...</p>;
  }

  const filteredItems = food_list.filter(item =>
    category === "All" ||
    category.toLowerCase().trim() === item.category.toLowerCase().trim()
  );

  console.log("Selected Category:", category);
  console.log("Filtered Items:", filteredItems);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No items found ❌</p>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay