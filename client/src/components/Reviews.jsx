import React from 'react'
import StarRating from './StarRating'

const Reviews = ({reviews}) => { //takes in the variable "reviews" given through RestaurantDetailsPage.jsx page which equals the selectedRestaurants.reviews state
    return (
        <div className="row row-cols-3 mb-2">

            {reviews.map((review) =>{
                return (

                //review card
                <div key={review.id} className="card text-white bg-info mb-3 mr-4" style = {{maxWidth: "30%"}}>
                <div className="card-header d-flex justify-content-between">
                    <span>{review.name}</span> 
                    <span><StarRating rating = {review.rating}/></span>
                </div>
                <div className='card-body'>
                    <p className='card-text'>{review.review}</p>
                </div>
            </div>
                )
            })}


            

        </div>
    )
}

export default Reviews
