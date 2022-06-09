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

  return <div className='card-body container mt-5'> 
      <h3 className="my-3 text-center"><i className="fa fa-lock"></i> Register</h3>
      <form onSubmit={onSubmitForm}>
         {/*email input*/}
      <div className="md-form font-weight-light">
      <i className="fa fa-envelope prefix grey-text"></i>
        <input value = {email} onChange={e =>onChange(e)} type='email' name='email' placeholder='Email' className='form-control' />
        <label htmlFor="email">Your Email</label>
        </div>

        {/*password input*/}
        <div className="md-form font-weight-light">
        <i className="fa fa-lock prefix grey-text"></i>
        <input value = {password} onChange={e =>onChange(e)} type='password' name='password' placeholder='Password' className='form-control' />
        <label htmlFor="password">Your Password</label>
        </div>

        {/*name input*/}
        <div className="md-form font-weight-light">
        <i className="fa fa-user prefix grey-text"></i>
        <input value = {name} onChange={e =>onChange(e)} type='text' name='name' placeholder='Name' className='form-control'/>
        <label htmlFor="name">Your Name</label>
        </div>
        {/*submit button*/}
        <div className="text-center mt-4">
              <button className="btn btn-success" type="submit">Submit</button>
            </div>
      </form>
      <Link to ='/login' className="mb-5">Already have an account? Click here to login!</Link>
      <div className="mt-3">
      <Warning/>
      </div>
     
  </div>;
};

export default RegisterPage;

