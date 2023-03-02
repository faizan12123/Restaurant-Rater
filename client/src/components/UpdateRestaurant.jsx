/* we can't use our context API to pre-populate the input fields with the target restaurant because if someone
goes on the update restaurant URL directly without going to it from our home page, there will be no context because
the context is only populated when the restaurantList is prompted because the restaurantList page is what fetches the
data from the backend so we will have to use the useEffect() hook again instead*/

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import Back from './Back'
import Warning from './Warning'
import {toast} from "react-toastify"
import './style/UpdateRestaurant.css'
const UpdateRestaurant = (props) => {
    let navigate = useNavigate()

    const {id} = useParams() //gets the restaurant ID from the parameters of the URL

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")
    
    useEffect(() => { //fetches restaurant data (through triggering the router in server.js) based off ID inside the URL params
        const fetchData = async() => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                // console.log(response.data.data)
                setName(response.data.data.restaurant.name)
                setLocation(response.data.data.restaurant.location)
                setPriceRange(response.data.data.restaurant.price_range)
            } catch (err) {
                console.log(err);
            }
        }

        fetchData()
    }, [])

    const handleSubmit = async (e) => { //function that runs when submit button is clicked
        e.preventDefault()
        
        if (name == "") {
            toast.error("Must add a restaurant name!")
        }
        if (location == "") {
            toast.error("Must enter a location!")
        }
    

        if ((name !="") && (location != "")) {
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name:name, 
            location: location,
            price_range: priceRange
        })
        
        navigate("/home"); //makes the update page switch to the home page again after clicking the submit button
        toast.success(name + " updated successfully!")
    }
    }


    return (
        <div>
            <p className="big-title">Edit Restaurant</p>
          <div class="form-container">
            
            <form>
                <label htmlFor='name'>Name</label>
                <input value = {name} onChange = {e => setName(e.target.value)} id='name'type='text' />

                <label htmlFor='location'>Location</label>
                <input value = {location} onChange = {e => setLocation(e.target.value)} id='location' type='text' />

                <label htmlFor='price_range'>Price Range</label>
                <select value = {priceRange} onChange={e => setPriceRange(e.target.value)} id='price_range'  type='number'>
                    <option disabled> Price Range</option>
                    <option value = "1">$</option>
                    <option value = "2">$$</option>
                    <option value = "3">$$$</option>
                    <option value = "4">$$$$</option>
                    <option value = "5">$$$$$</option>
                </select>

                <button type = 'submit' onClick={handleSubmit}>Submit</button>
            </form>
            </div>
            <Warning />
        </div>
    )
}

export default UpdateRestaurant
