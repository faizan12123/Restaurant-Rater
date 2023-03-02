import React, { useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { Link } from 'react-router-dom';
import {toast} from "react-toastify"
import Warning from './Warning';
import './style/Login.css'

const RegisterPage = ({setAuth}) => {

  const [inputs, setInputs] = useState ({
    email: "",
    password: "",
    name: ""
  })

  //deconstructing the values of the inputs useState object
  const {email, password, name} =inputs

  const onChange = (e)=> {
    setInputs({...inputs, [e.target.name] : e.target.value}) //take all inputs and take the name of the value and assign whatever is inputed to the name
  }

  const onSubmitForm = async (e) => {
    e.preventDefault() //prevents page from refreshing
    if(process.env.NODE_ENV === 'production'){
    try {
      const body = {email, password, name}
      
      const response = await fetch("/api/v1/restaurants/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      const parseRes = await response.json()
      console.log(parseRes);

      if(parseRes.token) { //if there is a token generated
        localStorage.setItem("token",parseRes.token)
        setAuth(true)
        toast.success("Registered Successfully")
      } else {
        setAuth(false)
        toast.error(parseRes) //returning the error defined in the registration route
      }
      
    } catch (err) {
      console.log(err.message);
    }
  } else {
    try {
      const body = {email, password, name}
      
      const response = await fetch("http://localhost:3001/api/v1/restaurants/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      const parseRes = await response.json()
      console.log(parseRes);

      if(parseRes.token) { //if there is a token generated
        localStorage.setItem("token",parseRes.token)
        setAuth(true)
        toast.success("Registered Successfully")
      } else {
        setAuth(false)
        toast.error(parseRes) //returning the error defined in the registration route
      }
      
    } catch (err) {
      console.log(err.message);
    }
  }
  }

  return<div className="login-form-container">
<form onSubmit={onSubmitForm} class="login-form">
  <h2><i className="fa fa-lock"></i> Register</h2>
  <div class="form-group">
    <label for="text"><i className="fa fa-person"></i> Name</label>
    <input  value = {name} onChange={e =>onChange(e)} name = 'name' type="text" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter name"/>
  </div>
  <div class="form-group">
    <label for="email"><i className="fa fa-envelope"></i> Email address</label>
    <input value = {email} onChange = {e => onChange(e)} name = 'email' type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div class="form-group">
    <label for="password"><i className="fa fa-lock"></i> Password</label>
    <input value = {password} onChange = {e => onChange(e)} type="password" name = 'password' class="form-control" id="password" placeholder="Password"/>
  </div>
  <p className='text-danger'>Password must contain: 
        <li>6-16 characters</li>
        <li>At least one number</li>
        <li>At least one special character</li>
  </p>
  <button type="submit" class="form-button">Register</button>
  <div class="form-group">
    <p class="register-link"><Link to ='/login' className="mb-5">Already have an account? Click here to login!</Link></p>
  </div>
  <Warning/>
</form>
  </div>;
};

export default RegisterPage;

