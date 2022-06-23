import React, { useContext, useState } from 'react'
import {useParams, useNavigate } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from "../apis/RestaurantFinder"
import Warning from './Warning';
import {toast} from "react-toastify"

const AddReview = () => {

    const navigate = useNavigate();
    const{addReview} = useContext(RestaurantsContext)
    const {id} = useParams()
    //useStates:
    const [name, setName] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("Rating")



    const handleSubmitReview = async (e) => {
        e.preventDefault()
        try {
            if (name == "") {
                toast.error("Must add your name!")
            }
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
            <form action ="">
                <div className="form-row">

                    {/*Name of the user input field*/}
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value = {name} onChange={e=> setName(e.target.value)} id ="name" placeholder="Name" type="text" className="form-control" />
                    </div>

                    {/*rating drop down list for the restaurant*/}
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value = {rating} onChange={e=> setRating(e.target.value)} id="rating" className='custom-select'>
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                {/*Review input field*/}
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea value = {reviewText} onChange={e=> setReviewText(e.target.value)} id="Review" className="form-control"></textarea>
                </div>

                {/*submit button for the review*/}
                <button onClick={handleSubmitReview} type="submit" className="btn btn-info mb-3">Submit</button>
            </form>
            <Warning/>
        </div>
    )
}

export default AddReview
