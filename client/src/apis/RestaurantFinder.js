//to make calls to the backend server

import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:3001/api/v1/restaurants"
}) //creating an axious instance