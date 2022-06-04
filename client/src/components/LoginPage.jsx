import React, { useState } from 'react'
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
            const response = await RestaurantFinder.post("/login", {
                method: "POST",                headers: {"Content-Type": "application/json"},
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
        <div>
        {/* <section className="h-100 gradient-form" style={{backgroundColor: 'blue'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                <img style={{width: '185px'}} alt="logo" src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"/>
                  <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                </div>

                <form>
                  <p>Please login to your account</p>

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example11" className="form-control"
                      placeholder="Phone number or email address" />
                    <label className="form-label" htmlFor="form2Example11">Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example22" className="form-control" />
                    <label className="form-label" htmlFor="form2Example22">Password</label>
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Log
                      in</button>
                    <a className="text-muted" href="#!">Forgot password?</a>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button type="button" className="btn btn-outline-danger">Create new</button>
                  </div>

                </form>

              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<form>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
 */}
<form onSubmit={onSubmitForm}>
<div className="card-body container mt-5">

         
            <div className="form-header deep-blue-gradient rounded">
              <h3 className="my-3"><i className="fa fa-lock"></i> Login:</h3>
            </div>

        
            <div className="md-form font-weight-light">
              <i className="fa fa-envelope prefix grey-text"></i>
              <input value = {email} onChange = {e => onChange(e)} type = 'email' name = 'email' placeholder='email' className="form-control"/>
              <label htmlFor="materialFormEmailEx">Your email</label>
            </div>

          
            <div className="md-form font-weight-light">
              <i className="fa fa-lock prefix grey-text"></i>
              <input value = {password} onChange = {e => onChange(e)}  type = 'password' name = 'password' placeholder='password' className="form-control"/>
              <label htmlFor="materialFormPasswordEx">Your password</label>
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-success btn-light-blue waves-effect waves-light" type="submit">Login</button>
            </div>
            {/* <button className='btn btn-success btn-block'>Submit</button> */}
            
            <Link to = '/register'>Don't have an account? Click here to register an account!</Link>
          </div>
          </form>
          
         
         



        {/* <div className='container'>
            <h1 className='text-center my-5'>Login</h1>
            <form onSubmit={onSubmitForm}>
                <input value = {email} onChange = {e => onChange(e)} type = 'email' name = 'email' placeholder='email' className='form-control my-3'/>
                <input value = {password} onChange = {e => onChange(e)} type = 'password' name = 'password' placeholder='password' className='form-control my-3'/>
                <button className='btn btn-success btn-block'>Submit</button>
            </form>
            <Link to = '/register'>Don't have an account? Click here to register an account!</Link>
            
        </div> */}
        </div>
    )
}

export default LoginPage
