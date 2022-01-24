import React, {useEffect, useContext} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

//fetches the data from the API
const RestaurantList = (props) => {


        const {restaurants, setRestaurants} = useContext(RestaurantsContext) //{restaurant, setRestaurants}  comes from "value" from the RestaurantsContext.provider 

        let navigate = useNavigate()

        //useEffect hook makes sure that it fetches data as soon as the component mounts onto the screen
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await RestaurantFinder.get("/home") //adds a "/" to the baseURL from the RestaurantFinder.js axiom function
                    setRestaurants(response.data.data.restaurant); //to set our state and store our restaurants within our state
                } catch (err) {
                    console.log(err);
                }
            }

            fetchData(); //we create a fetchData function to return something because we don't want to directly return something within the useEffect function
        }, []) //passing an empty dependency array means that the useEffect hook will only run when the component mounts to the screen; without it, it would run every time the component re-renders

        //function when delete button is clicked
        const handleDelete = async (e, id) => {
            e.stopPropagation() //without this, clicking delete button would just prompt to the restaurant detail page since the detail page is set to clicking anywhere on the row
            try {
                const response = await RestaurantFinder.delete(`/${id}`);
                setRestaurants(restaurants.filter(restaurant => {
                    return restaurant.id !==id //if this is true, then we will add that restaurant that we itrerated over back to the restaurants from context, so when restaurants.id does not  = the id that we want to delete, we will add that to the array but if they do match, then we leave that out
                }))
            } catch (err) {
                console.log(err);
            }
        }

        //function for when update button is clicked
        const handleUpdate = (e, id) => {
            e.stopPropagation() //without this, clicking update button would just prompt to the restaurant detail page since the detail page is set to clicking anywhere on the row
            navigate(`/restaurants/${id}/update`) //when we click the update button it prompts up that url
        }

        //function so that when u click on a row it navigates to the detail page URL
        const handleRestaurantSelect = (id) => {
            navigate(`/restaurants/${id}`)
        }

        //function to show the ratings for each restaurant
        const renderRating = (restaurant) => {
            if(!restaurant.count) {
                return <span className="text-warning">0 Reviews</span> //if there is no reviews we say there are 0 reviews
            }
            return (
                <>
            <StarRating rating = {restaurant.average_rating}/>
            <span className="text-warning ml-1">({restaurant.count})</span>
            </>
            )
        }

    return (
        <div className='list-group'>
            {/*dark is gonna make it a dark background; table-hover makes it so that when u hover over a restaurant row, it highlights it*/}
            <table className="table table-hover table-dark">


                <thead> {/*makes the row of headers*/}
                    <tr className="bg-info"> {/*makes the top row blue*/}
                        <th scope = "col">Restaurant</th>
                        <th scope = "col">Location</th>
                        <th scope = "col">Price Range</th>
                        <th scope = "col">Ratings</th>
                        <th scope = "col">Edit</th>
                        <th scope = "col">Delete</th>
                    </tr>
                </thead>


                <tbody>
                    {restaurants && restaurants.map(restaurant => { /*each restaurant(the parameter) is gonna represent a restaurant we are iterating over*/
                    /*"restaurant &&"means that it will only do the mapping if the restaurants data has properly been fetched from DB*/
                        return(
                        <tr onClick={() => handleRestaurantSelect(restaurant.id)} key = {restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td> {/*will create a dollar sign for every number in the price_range*/}
                            <td>{renderRating(restaurant)}</td>
                            <td><button  onClick = {(e) => handleUpdate(e, restaurant.id)}className="btn btn-warning">Update</button></td>
                            <td><button onClick = {(e) => handleDelete(e, restaurant.id)} //we pass an arrow function instead of the function itself because without it, code will think to just run the function right away, but we only want to run it once the button is actually clicked so we want it to run a reference to the function not the functtion itself
                            className="btn btn-danger">Delete</button></td>
                        </tr>
                        );
                    })} 
                </tbody> 


            </table> 
            
        </div>
    )
}

export default RestaurantList
