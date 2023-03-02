import './style/Header.css'
import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"
import RestaurantFinder from '../apis/RestaurantFinder'

const Header = ({setAuth}) => {

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
    }, [])
    
    const logout = async (e) => {
        e.preventDefault()
        localStorage.removeItem("token") //removes the token from the local storage when a person logs out
        setAuth(false)
        toast.success("Logged out successfully!")
    }

    return (
        <div className="header-container">
            <button onClick={(e) => logout(e)} className='logout-back-button'>Logout {name}</button>
            <div class="text-container">
                    <h1>Restaurant Rater</h1>
                    <p>Rate and review your favorite restaurants!</p>
                </div>
        </div>
    )
}

export default Header;
