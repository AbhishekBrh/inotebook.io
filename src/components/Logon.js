import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Logon = (props) => {
    const [creds, setCreds] = useState({email:"", password:""});
    const navigate = useNavigate();
  
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email: creds.email, password: creds.password}), 
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
          localStorage.setItem('token',json.authtoken)
          navigate("/");
          props.showAlert("Login Successfull", "success")
        }else{
          props.showAlert("invalid user", "danger")
        }
    }
    const onchange =(e)=>{
      setCreds({...creds,[e.target.name] : e.target.value})
  }
  return (
    <>
    <h2>Please Login to continue</h2>
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onchange}
            value={creds.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onchange}
            value={creds.password}
            name="password"
            placeholder="Password"
          />
        </div>
        {/* <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  </>
  )
}

export default Logon
