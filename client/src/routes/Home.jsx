import React, { useEffect, useState } from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'
import {toast} from "react-toastify"
import Warning from '../components/Warning'
import Footer from '../components/Footer'
import RestaurantFinder from '../apis/RestaurantFinder'

const Home = ({setAuth}) => { 
    
    return (
        <div>
            <Header setAuth={setAuth}/>
            <AddRestaurant/>
            <RestaurantList/>
            <Warning/>
        </div>
    )
}
export default Home
