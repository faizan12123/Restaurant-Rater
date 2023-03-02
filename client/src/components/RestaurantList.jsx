import React, {useEffect, useContext, useState} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import Warning from './Warning';
import { toast } from 'react-toastify';
import './style/RestaurantList.css'

//fetches the data from the API
const RestaurantList = (props) => {
    const [creator, setCreator] = useState("")
    const [isCreator, setIsCreator] = useState(false)

    // const [restaurantCreator, setRestaurantCreator] = useState("")

    const getProfile = async () => {
        try {
            const response = await RestaurantFinder.post("home")
            setCreator(response.data.userName.user_id)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])
        const {restaurants, setRestaurants} = useContext(RestaurantsContext) //{restaurant, setRestaurants}  comes from "value" from the RestaurantsContext.provider 

        let navigate = useNavigate()

        //useEffect hook makes sure that it fetches data as soon as the component mounts onto the screen
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await RestaurantFinder.get("/home") //adds a "/home" to the baseURL from the RestaurantFinder.js axiom function
                    setRestaurants(response.data.data.restaurant); //to set our state and store our restaurants within our state
                    // console.log(response.data.data.restaurant[0].creator)
                    
                } catch (err) {
                    console.log(err);
                }
            }

            fetchData(); //we create a fetchData function to return something because we don't want to directly return something within the useEffect function
        }, []) //passing an empty dependency array means that the useEffect hook will only run when the component mounts to the screen; without it, it would run every time the component re-renders


    useEffect(() => {
        getProfile()
        // isCreatorFunc()
    }, [])
    

        //function when delete button is clicked
        const handleDelete = async (e, id, restaurantCreator, restaurantName) => {
            e.stopPropagation() //without this, clicking delete button would just prompt to the restaurant detail page since the detail page is set to clicking anywhere on the row
            try {
                if (restaurantCreator == creator) {
                    toast.success(restaurantName + " deleted!")
                    const response = await RestaurantFinder.delete(`/${id}`);
                    setRestaurants(restaurants.filter(restaurant => {
                    return restaurant.id !==id //if this is true, then we will add that restaurant that we iterated over back to the restaurants from context, so when restaurants.id does not  = the id that we want to delete, we will add that to the array but if they do match, then we leave that out
                }))
                } else {
                    toast.error("You can only delete a restaurant you added!")
                }
            } catch (err) {
                console.log(err);
            }
        }
        
        //function for when update button is clicked
        const handleUpdate = (e, id, restaurantCreator) => {
            e.stopPropagation() //without this, clicking update button would just prompt to the restaurant detail page since the detail page is set to clicking anywhere on the row
            if (restaurantCreator == creator) {
                        navigate(`/restaurants/${id}/update`)
                    } else {
                        toast.error("You can only update a restaurant you added!")
                    }
             //when we click the update button it prompts up that url
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
        <div className = "card-container">
            {restaurants && restaurants.map(restaurant => { /*each restaurant(the parameter) is gonna represent a restaurant we are iterating over*/
            return (
            <div className="card" onClick={() => handleRestaurantSelect(restaurant.id)} key = {restaurant.id}>
                <div className="card-header">
                    <h2 className="card-title">{restaurant.name}</h2>
                    <div className="card-buttons">
                        <button onClick = {(e) => handleUpdate(e, restaurant.id, restaurant.creator)} id="editBtn" className={(restaurant.creator != creator ? 'disabled-edit-button' : 'edit-button')}>Edit</button>
                        <button button onClick = {(e) => handleDelete(e, restaurant.id, restaurant.creator, restaurant.name)} className={(restaurant.creator != creator ? 'disabled-delete-button' : 'delete-button')}>Delete</button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="label">Location:</div>
                        <div className="value">{restaurant.location}</div>
                    </div>
                    <div className="row">
                        <div className="label">Price Range:</div>
                        <div className="value">{"$".repeat(restaurant.price_range)}</div>
                    </div>
                    <div className="row">
                        <div className="label">Ratings:</div>
                        <div className="value">{renderRating(restaurant)}</div>
                    </div>
                 </div>
            </div>  
        )})} 
      </div>    
    )
}

export default RestaurantList
