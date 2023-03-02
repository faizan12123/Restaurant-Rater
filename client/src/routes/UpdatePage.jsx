import React from 'react'
import Back from '../components/Back'
import UpdateRestaurant from '../components/UpdateRestaurant'


const UpdatePage = () => {
    return (
        <div className="">
            <Back/>
            <h1 className='text-center'>Update Restaurant</h1>
            <UpdateRestaurant/>
        </div>
    )
}

export default UpdatePage
