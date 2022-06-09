import React, { useEffect, useContext } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import AddReview from '../components/AddReview'
import Back from '../components/Back'
import Reviews from '../components/Reviews'
import StarRating from '../components/StarRating'
import { RestaurantsContext } from '../context/RestaurantsContext'


const RestaurantDetailPage = () => {
    const{id} = useParams()
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(() =>{
        const fetchData = async () => {

            try {
                const response = await RestaurantFinder.get(`/${id}`)
                console.log(response)
                setSelectedRestaurant(response.data.data) //makes the state contain the selected Restaurant and it's associated reviews
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
        
    },[])


    return (
        
            <div className="mr-5 ml-5 mt-2 mb-5">
                <Back/>
                {selectedRestaurant && (
                <>
                <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
                <div className="text-center">
                    <StarRating rating = {selectedRestaurant.restaurant.average_rating} />
                    <span className="span text-warning ml-1">
                        {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}
                    </span>
                </div>
                <div className="mt-3">
                    <Reviews reviews={selectedRestaurant.reviews} /> {/*gives reviews access to the restaurant and all of it's reviews*/}
                </div>
                <AddReview/>
                </>
            )}
            </div>
        
    )
}

export default RestaurantDetailPage