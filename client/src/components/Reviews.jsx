import React from 'react'
import Back from './Back'
import StarRating from './StarRating'
import Warning from './Warning'

const Reviews = ({reviews}) => { //takes in the variable "reviews" given through RestaurantDetailsPage.jsx page which equals the selectedRestaurants.reviews state
    return (
           <div>

        <div className="row row-cols-1">
            
            {reviews.map((review) =>{
                return (

                //review card
                <div key={review.id} className="card text-white bg-info mb-3">
                <div className="card-header text-center">
                    <span>{review.name} </span>
                    <p></p>
                    <span><StarRating rating = {review.rating}/></span>
                </div>
                <div className='card-body'>
                    <p className='card-text'>{review.review}</p>
                </div>
            </div>
                )
            })}


            

        </div>
        </div>
    )
}

export default Reviews
