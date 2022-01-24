import React from 'react'

const StarRating = ({rating}) => {
    const stars = [];

    //example of first iteration: rating =4
    for (let i =1; i<=5; i++) {
        if(i <= rating) { //i is less than 4
            stars.push(<i key={i} className="fas fa-star text-warning"></i>) //push in a star and repeat until there are 4 stars
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) { //Math.ciel rounds any decimal to the higher number and "!Number.isInteger" makes sure that the number is a decimal(not an int)
            stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>) //puts a half star for the last star
        }
        else {
            stars.push(<i key={i} className="far fa-star text-warning"></i>) //pushes in an empty star if rating is less than 5
    }
}
    
    return (
        <>
        {stars}
        </>
    )
}

export default StarRating
