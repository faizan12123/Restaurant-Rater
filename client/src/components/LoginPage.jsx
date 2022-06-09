import React, { useState } from 'react'
import {Link} from "react-router-dom"
import {toast} from "react-toastify"
import Warning from './Warning'


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
                toast.success("login successfull!")
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
              toast.success("login successfull!")
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
        <div>

<form onSubmit={onSubmitForm}>
<div className="card-body container mt-5">

         
<h3 className="my-3 text-center"><i className="fa fa-lock"></i> Login</h3>

        
            <div className="md-form font-weight-light">
              <i className="fa fa-envelope prefix grey-text"></i>
              <input value = {email} onChange = {e => onChange(e)} type = 'email' name = 'email' placeholder='Email' className="form-control"/>
              <label htmlFor="email">Your Email</label>
            </div>

          
            <div className="md-form font-weight-light">
              <i className="fa fa-lock prefix grey-text"></i>
              <input value = {password} onChange = {e => onChange(e)}  type = 'password' name = 'password' placeholder='Password' className="form-control"/>
              <label htmlFor="password">Your Password</label>
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-success" type="submit">Login</button>
            </div>
            {/* <button className='btn btn-success btn-block'>Submit</button> */}
            
            <Link to = '/register'>Don't have an account? Click here to register an account!</Link>
            <div className="mt-3">
      <Warning/>
      </div>
          </div>
          
          </form>
        </div>
    )
}

export default LoginPage
