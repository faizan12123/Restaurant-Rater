import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import {toast} from "react-toastify"
import Home from "./routes/Home"
import UpdatePage from "./routes/UpdatePage"
import RestaurantDetailPage from "./routes/RestaurantDetailPage"
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import { RestaurantsContextProvider } from './context/RestaurantsContext'
import RestaurantFinder from './apis/RestaurantFinder'

toast.configure()

const App = () => { //connecting the urls to the corresponding react pages

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
      setIsAuthenticated(boolean);
    };

    //veryfying the token in the storage if there is a token in the storage
    const checkAuthenticated = async () => {
        try {
            const response = await RestaurantFinder.post("/is-verify", {
                headers: {token: localStorage.token}
            })

            const parseRes = await response.json() //will return whether the token is true or not


            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false); //if their is a token in storage and it is verified, authenticate the user

        } catch (err){
    console.error(err.message);
        }
    }
    useEffect(() => {
        checkAuthenticated()
    },[])
  
    return ( 
        <RestaurantsContextProvider>
            <div>
                <Router>
                    <Routes>

                    <Route path="/" element = {<Navigate to="/home" />}/>
                    <Route path="/home" element= {isAuthenticated ? ( <Home setAuth={setAuth} />) : (<Navigate to="/login" />)}/>
                    <Route path="/restaurants/:id/update" element= {isAuthenticated ? (<UpdatePage setAuth={setAuth} />) : (<Navigate to="/login" />)}/>
                    <Route path="/restaurants/:id" element= {isAuthenticated ? (<RestaurantDetailPage setAuth={setAuth} />) : (<Navigate to="/login"/>)}/>
                    <Route path="/login" element={!isAuthenticated ? (<LoginPage setAuth={setAuth} />) : (<Navigate to="/home" />)}/>
                    <Route path="/register" element={ !isAuthenticated ? (<RegisterPage setAuth={setAuth} />) : (<Navigate to="/home" />)}/>
                    
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    )}

export default App;