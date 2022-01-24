import React, {useState, createContext} from "react";

export const RestaurantsContext = createContext();

//wrap our entire application so that they all have access to our state
export const RestaurantsContextProvider = (props) => {
    //useState hook will pass/store data to our context.
    const [restaurants, setRestaurants] = useState([]) // restaurants = current state(all the restaurants fetched from the backend server); setRestaurants = function that updates the state

    const [selectedRestaurant, setSelectedRestaurant] = useState(null) //to store what restaurant is currently selected and it's associated reviews in the details page


//function for adding a restaurant
    const addRestaurants = (restaurant) => { //passing in the newly created restaurant
        setRestaurants([...restaurants, restaurant]); //carries over what is already in the restaurants array above and then just add the new restaurant
    }



    return (
        //passing restaurants down to the provider
        <RestaurantsContext.Provider value = {{restaurants: restaurants, setRestaurants: setRestaurants, addRestaurants, selectedRestaurant: selectedRestaurant, setSelectedRestaurant: setSelectedRestaurant}}>
            {props.children}
        </RestaurantsContext.Provider>
    );
};