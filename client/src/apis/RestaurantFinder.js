//to make calls to the backend server

import axios from "axios"


// NODE_ENV = 'development'
// NODE_ENV = 'production'


//if we are in production baseURL = /api/v1/restaurants else baseURL =  "http://localhost:3001/api/v1/restaurants"
const baseURL = process.env.NODE_ENV === 'production' ? "api/v1/restaurants" : 'http://localhost:3001/api/v1/restaurants'


export default axios.create({
    baseURL: baseURL,
}) //creating an axious instance