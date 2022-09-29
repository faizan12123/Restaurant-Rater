import React, { useEffect, useState } from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'
import {toast} from "react-toastify"
import Warning from '../components/Warning'
import Footer from '../components/Footer'
import RestaurantFinder from '../apis/RestaurantFinder'

const Home = ({setAuth}) => { 
    

    const [name, setName] = useState("")

    const getProfile = async () => {
      
        try {
            const response = await RestaurantFinder.post("home")

            setName(response.data.userName.user_name)

        } catch (err) {
            console.error(err.message)
            window.location.reload(false);
        }
    }
    useEffect(() => {
        getProfile()
    }, []) //adding the [] makes sure that it ends the requests once it is rendered
    
    const logout = async (e) => {
        e.preventDefault()
        localStorage.removeItem("token") //removes the token from the local storage when a person logs out
        setAuth(false)
        toast.success("Logged out successfully!")
    }

    
    return (
        <div className="mr-5 ml-5 mt-2 mb-5">
            <button onClick={(e) => logout(e)} className='btn btn-info'>Logout {name}</button>
            <Header/>
            <AddRestaurant/>
            <RestaurantList/>
            <Warning/>
        </div>
    )
}
export default Home
