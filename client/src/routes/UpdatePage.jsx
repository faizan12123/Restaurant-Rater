import React from 'react'
import Back from '../components/Back'
import UpdateRestaurant from '../components/UpdateRestaurant'


const UpdatePage = () => {
    return (
        <div className="mr-5 ml-5 mt-2 mb-5">
            <Back/>
            <h1 className='text-center'>Update Restaurant</h1>
            <UpdateRestaurant/>
        </div>
    )
}

export default UpdatePage
