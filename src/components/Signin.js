import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = (props) => {
    const [creds, setCreds] = useState({name:"", email:"", password:""});
    const navigate = useNavigate();
  
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email ,password} = creds;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, email ,password}), 
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
          localStorage.setItem('token',json.authtoken)
          navigate("/");
          props.showAlert("Account Created Successfully", "success")
        }else{
          props.showAlert("invalid user", "danger")
        }
    }
    const onchange =(e)=>{
      setCreds({...creds,[e.target.name] : e.target.value})
  }
  return (
    <>
     <h2>SignIn to create an account</h2>
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
        <label htmlFor="name">Name</label>
          <input
          onChange={onchange}
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter Your Name"
          />
        </div>
        <div>
           <label htmlFor="email">Email address</label>
          <input
          onChange={onchange}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
          onChange={onchange}
            type="password"
            className="form-control"
            id="passeord"
            name="password"
            placeholder="Password"
            minLength={5} required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
    </>
  )
}

export default Signin
