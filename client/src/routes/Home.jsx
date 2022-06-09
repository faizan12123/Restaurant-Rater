import React, { useEffect, useState } from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'
import {toast} from "react-toastify"
import Warning from '../components/Warning'
import Footer from '../components/Footer'

const Home = ({setAuth}) => { 

    const [name, setName] = useState("")

    const getProfile = async () => {
        if(process.env.NODE_ENV === 'production'){
        try {
            const response = await fetch("/api/v1/restaurants/home", {
                method: "POST",
                headers: {token: localStorage.token} //because the authorization route in the server.js wants the token from the header
            })
            const parseRes = await response.json()
            setName(parseRes.user_name)
            

        } catch (err) {
            console.error(err.message)
        }
    } else {
        try {
            const response = await fetch("http://localhost:3001/api/v1/restaurants/home", {
                method: "POST",
                headers: {token: localStorage.token} //because the authorization route in the server.js wants the token from the header
            })
            const parseRes = await response.json()
            setName(parseRes.user_name)
            

        } catch (err) {
            console.error(err.message)
        }
    }
    }

    const logout = async (e) => {
        e.preventDefault()
        localStorage.removeItem("token") //removes the token from the local storage when a person logs out
        setAuth(false)
        toast.success("Logged out successfully!")
    }

    useEffect(() => {
        getProfile()
    }, []) //adding the [] makes sure that it ends the requests once it is rendered
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
