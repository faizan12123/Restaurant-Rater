import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import {toast} from "react-toastify"
const LoginPage = ({setAuth}) => {
    

    const [inputs, setInputs] = useState({
        email: "", //defaults the email as blank
        password: "" //defaults the password as blank
    })

    const{email, password} = inputs

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value}) //changes the name of the input to the current state of the input field
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = {email, password}
            const response = await fetch("http://localhost:3001/api/v1/restaurants/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = await response.json() //getting the token and storing it in a variable

            if(parseRes.token) { //if there is a token generated
                localStorage.setItem('token', parseRes.token) //storing the token in the local storage
                setAuth(true)
                toast.success("login successfull!")
            } else {
                setAuth(false)
                toast.error(parseRes) //returning the error created in the login route in server.js
            }
            
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        
        <div className='container'>
            <h1 className='text-center my-5'>login</h1>
            <form onSubmit={onSubmitForm}>
                <input value = {email} onChange = {e => onChange(e)} type = 'email' name = 'email' placeholder='email' className='form-control my-3'/>
                <input value = {password} onChange = {e => onChange(e)} type = 'password' name = 'password' placeholder='password' className='form-control my-3'/>
                <button className='btn btn-success btn-block'>Submit</button>
            </form>
            <Link to = '/register'>Don't have an account? Click here to register an account!</Link>
            
        </div>
    )
}

export default LoginPage
