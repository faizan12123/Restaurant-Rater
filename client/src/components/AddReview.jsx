import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from "../apis/RestaurantFinder"

const AddReview = () => {

    const{addReview} = useContext(RestaurantsContext)
    const {id} = useParams()
    //useStates:
    const [name, setName] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("Rating")


    const handleSubmitReview = async (e) => {
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`,{ //post because the router in server.js says so
                name: name,
                review: reviewText,
                rating: rating
            }) 
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='mb-2'>
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
                <button onClick={handleSubmitReview} type="submit" className="btn btn-info">Submit</button>
            </form>
        </div>
    )
}

export default AddReview
