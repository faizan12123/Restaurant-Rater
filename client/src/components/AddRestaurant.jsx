import React, { useContext, useState } from 'react';
import RestaurantFinder from "../apis/RestaurantFinder"
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range") //sets the pre-set price_range box to say "Price Range"

    //function that runs when submit button is clicked
    const handleSubmit = async (e) => {
        e.preventDefault() //prevents page from reloading which is bad in React because it makes u lose the state
        try {
            const response = await RestaurantFinder.post("/",{ //post because the router in server.js says so
                name: name,
                location: location,
                price_range: priceRange //our backend DB is expecting price_range so that is why it is with "_" on the left
            }) 
            addRestaurants(response.data.data.restaurant) //adds the new restaurant to the existing list of restaurants in the "restaurants" context, which updates the existing displayed restaurants since the table displays the values from the "restaurants" context
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className = "mb-4"> {/*to give a margin on the bottom*/}
            <form action="">
                {/*creates the row for the name, location, price_range and add button*/}
                <div className="form-row">

                 {/*name input field column*/}
                    <div className="col">
                    <input value = {name} onChange={e => setName(e.target.value)} type = "text" className="form-control" placeholder='Name'/> 
                    </div>

                {/*location input field column*/}
                    <div className="col"> 
                    <input value = {location} onChange={e => setLocation(e.target.value)} type = "text" className="form-control" placeholder='Location'/> 
                    </div>

                {/*price range drop down field column*/}
                    <div className="col"> 
                        <select value = {priceRange} onChange={e => setPriceRange(e.target.value)} className = "custom-select"> 
                        <option disabled> Price Range</option>
                        <option value = "1">$</option>
                        <option value = "2">$$</option>
                        <option value = "3">$$$</option>
                        <option value = "4">$$$$</option>
                        <option value = "5">$$$$$</option>
                        </select>
                    </div>

                    {/*add button column*/}
                    <div> 
                    <button onClick={handleSubmit} type="submit" className="btn btn-info">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
