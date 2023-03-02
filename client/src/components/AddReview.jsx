import React, { useContext, useEffect, useState } from 'react'
import {useParams, useNavigate } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from "../apis/RestaurantFinder"
import Warning from './Warning';
import {toast} from "react-toastify"
import './style/AddReview.css'

const AddReview = () => {

    const navigate = useNavigate();
    const{addReview} = useContext(RestaurantsContext)
    const {id} = useParams()
    //useStates:
    const [name, setName] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("Rating")

    const getProfile = async () => {
      
        try {
            const response = await RestaurantFinder.post("home")

            setName(response.data.userName.user_name)
            

        } catch (err) {
            console.error(err.message)
        }
  
    }

    useEffect(() => {
        getProfile()
    }, [])

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        try {
            if (reviewText == "") {
                toast.error("Must enter a review!")
            }
            if (rating == "Rating") {
                toast.error("Must add a rating!")
            }

            if ((name != "") && (reviewText != "") && (rating != "Rating")) {
                const response = await RestaurantFinder.post(`/${id}/addReview`,{ //post because the router in server.js says so
                    name: name,
                    review: reviewText,
                    rating: rating
                }) 
                console.log(response);
                toast.success(name + "'s review added!")
                navigate(`/restaurants`)
                navigate(`/restaurants/${id}`)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        
        <div>
            <p className = "title">Leave a Review!</p>
            <div class="review-input-row">
            <textarea value = {reviewText} onChange={e=> setReviewText(e.target.value)} id="Review" placeholder="Enter review here"></textarea>
                <select value = {rating} onChange={e=> setRating(e.target.value)} id="rating">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                <button onClick={handleSubmitReview} type="submit">Add</button>
            </div>
            
            <Warning/>
        </div>
    )
}

export default AddReview
