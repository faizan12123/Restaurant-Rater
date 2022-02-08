import React, { useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, Outlet} from "react-router-dom"
import Home from "./routes/Home"
import UpdatePage from "./routes/UpdatePage"
import RestaurantDetailPage from "./routes/RestaurantDetailPage"
import { RestaurantsContextProvider } from './context/RestaurantsContext'
import Login from './routes/Login'
import Register from './routes/Register'
import "react-toastify/dist/ReactToastify.css"
import PrivateRoute from './routes/PrivateRoute'
const App = () => { //connecting the urls to the corresponding react pages

    return ( 
        <RestaurantsContextProvider>
            <div className='container-fluid'>
                <Router>
                    <Routes>

                        {/* home page route*/}
                    <Route element={<PrivateRoute />}>
                        <Route path="/home" element={<Home/>} />
                    </Route>

                        {/* Update Page Route */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/restaurants/:id/update" element={<UpdatePage/>} />
                    </Route>

                        {/* Restaurant Detail Page Route */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/restaurants/:id" element={<RestaurantDetailPage/>} />
                    </Route>

                        {/* Login Page Route */}
                    <Route exact path = "/login"  element ={<Login/>} />

                        {/* Register Page Route */}
                    <Route exact path = "/register"  element ={<Register/>} />

                    {/* <Route exact path = "/home"  element ={<Home/>} render = {props => isAuthenticated ? (<Home {...props}/>) : (<Navigate to ="/login" />)} />  */}
                    {/* <Route exact path = "/restaurants/:id/update" element ={<UpdatePage/>} render = {props => <UpdatePage {...props}/>} /> */}
                    {/* <Route exact path = "/restaurants/:id" element ={<RestaurantDetailPage/>} render = {props => <RestaurantDetailPage {...props}/>} /> */}
                    {/* <Route exact path = "/login" element ={<Login/>} render = {props => !isAuthenticated ? <Login {...props}/> :<Navigate to="/home"/>} />
                    <Route exact path = "/register"  element ={<Register/>} render = {props => !isAuthenticated ? <Register {...props}/> :<Navigate to="/home"/>}/> */}
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    )}

export default App;