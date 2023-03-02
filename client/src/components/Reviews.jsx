import React from 'react'
import Back from './Back'
import StarRating from './StarRating'
import Warning from './Warning'
import './style/Reviews.css'

const Reviews = ({reviews}) => { //takes in the variable "reviews" given through RestaurantDetailsPage.jsx page which equals the selectedRestaurants.reviews state
    return (
        <div className = "review-card-container">
            
            {reviews.map((review) =>{
                return (
                    <div className="review-card" key={review.id}>
                    <div className="review-card-header">
                        <h2 className="review-card-title">{review.name}</h2>
                        <div className="review-card-buttons">
                        <span><StarRating rating = {review.rating}/></span>
                        </div>
                    </div>
                    <div className="review-card-body">
                            <p>{review.review}</p>
                     </div>
                </div>
                
                )
            })}
        </div>

    )
}

export default Reviews
