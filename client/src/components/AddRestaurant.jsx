import React, { useContext, useEffect, useState } from 'react';
import RestaurantFinder from "../apis/RestaurantFinder"
import { RestaurantsContext } from '../context/RestaurantsContext';
import {toast} from "react-toastify"
import './style/AddRestaurant.css'

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range") //sets the pre-set price_range box to say "Price Range"
    const [creator, setCreator] = useState("")

    //function for getting current user_id
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
    //function that runs when submit button is clicked
    const handleSubmit = async (e) => {
        e.preventDefault() //prevents page from reloading which is bad in React because it makes u lose the state
        try {
            if (name == "") {
                toast.error("Must add a restaurant name!")
            }
            if (location == "") {
                toast.error("Must enter a location!")
            }
            if (priceRange == "Price Range") {
                toast.error("Must enter a price range!")
            }

            if ((name !="") && (location != "") && (priceRange != "Price Range")) {
                const response = await RestaurantFinder.post("/",{ //post because the router in server.js says so
                    name: name,
                    location: location,
                    price_range: priceRange, //our backend DB is expecting price_range so that is why it is with "_" on the left
                    creator: creator
                }) 
                addRestaurants(response.data.data.restaurant) //adds the new restaurant to the existing list of restaurants in the "restaurants" context, which updates the existing displayed restaurants since the table displays the values from the "restaurants" context
                setName("")
                setLocation("")
                setPriceRange("Price Range")
                toast.success(name + " added!")
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <p className = "title">Add a Restaurant</p>
            <div class="input-row">
                <input value = {name} onChange={e => setName(e.target.value)} type = "text" placeholder='Name' required="required"/>
                <input value = {location} onChange={e => setLocation(e.target.value)} type = "text" placeholder='Location' required="required"/>
                <select value = {priceRange} onChange={e => setPriceRange(e.target.value)} required="required"> 
                    <option disabled>Price Range</option>
                    <option value = "1">$</option>
                    <option value = "2">$$</option>
                    <option value = "3">$$$</option>
                    <option value = "4">$$$$</option>
                    <option value = "5">$$$$$</option>
                </select>
                <button onClick={handleSubmit} type="submit">Add</button>
            </div>
        </div>
    )
}

export default AddRestaurant
