import React, { useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { Link } from 'react-router-dom';
import {toast} from "react-toastify"
import Warning from './Warning';

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

  return <div className='container'> 
      <h1 className='text-center my-5'>Register</h1>
      <form onSubmit={onSubmitForm}>
        {/*email input*/}
        <input value = {email} onChange={e =>onChange(e)} type='email' name='email' placeholder='email' className='form-control my-3' />

        {/*password input*/}
        <input value = {password} onChange={e =>onChange(e)} type='password' name='password' placeholder='password' className='form-control my-3' />

        {/*name input*/}
        <input value = {name} onChange={e =>onChange(e)} type='text' name='name' placeholder='name' className='form-control my-3'/>

        {/*submit button*/}
        <button className='btn btn-success btn-block'>Submit</button>
      </form>
      <Link to ='/login'>Already have an account? Click here to login!</Link>
      <Warning/>
  </div>;
};

export default RegisterPage;

