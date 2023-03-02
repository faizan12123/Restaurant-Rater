import React, { useState } from 'react'
import {Link} from "react-router-dom"
import {toast} from "react-toastify"
import Warning from './Warning'
import './style/Login.css'

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
        if(process.env.NODE_ENV === 'production'){
        try {
            const body = {email, password}
            const response = await fetch("/api/v1/restaurants/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = await response.json() //getting the token and storing it in a variable

            if(parseRes.token) { //if there is a token generated
                localStorage.setItem('token', parseRes.token) //storing the token in the local storage
                setAuth(true)
                toast.success("Login Successful!")
            } else {
                setAuth(false)
                toast.error(parseRes) //returning the error created in the login route in server.js
            }
            
        } catch (err) {
            console.error(err.message)
        }
      } else {
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
              toast.success("Login Successful!")
          } else {
              setAuth(false)
              toast.error(parseRes) //returning the error created in the login route in server.js
          }
          
      } catch (err) {
          console.error(err.message)
      }
      }
    }
    return (
        <div className="login-form-container">
<form onSubmit={onSubmitForm} class="login-form">
  <h2><i className="fa fa-lock"></i> Login</h2>
  <div class="form-group">
    <label for="email"><i className="fa fa-envelope"></i> Email address</label>
    <input value = {email} onChange = {e => onChange(e)} name = 'email' type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div class="form-group">
    <label for="password"><i className="fa fa-lock"></i> Password</label>
    <input value = {password} onChange = {e => onChange(e)} type="password" name = 'password' class="form-control" id="password" placeholder="Password"/>
  </div>
  <button type="submit" class="form-button">Login</button>
  <div class="form-group">
    <p class="register-link"><Link to = '/register'>Don't have an account? Click here to register an account!</Link></p>
  </div>
  <Warning/>
</form>

        </div>
    )
}

export default LoginPage
