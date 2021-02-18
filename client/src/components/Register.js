import React, { useContext, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/login.css'
import {register} from '../services/auth.service'
import { Redirect } from 'react-router-dom';
import UserContext from '../context/userContext';

const Login = () => {

    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password, setPassword] = useState("");
    const [redirect,setRedirect] = useState(false)
    const [success,setSuccess] = useState(false)


    const handleForm= async (e)=>{
        e.preventDefault()
        register(email,name,password).then(()=>{
          setSuccess(true)
          setTimeout(() => {
            setRedirect(true)
           }, 2000);
        })
    }

    if(redirect) return <Redirect to="/login" />

    return (
        <div className="container mt-5">
        {success 
        ? 
        <div className="d-flex justify-content-center">
        <div class="alert alert-success text-center p-3" role="alert">
          Kaydınız başarıyla tamamlandı, giriş sayfasına yönlendiriliyorsunuz...
        </div>
        </div>
        :
        <div className="row"> 
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Register</h5>
                <form onSubmit={(e)=>handleForm(e)} className="form-signin">
                  <div className="form-label-group">
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="inputEmail" className="form-control" placeholder="Email address"/>
                    <label htmlFor="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input value={name} onChange={(e)=>setName(e.target.value)} id="inputName" type="text" className="form-control" placeholder="name"/>
                    <label htmlFor="inputName">name</label>
                  </div>
    
    
                  <div className="form-label-group">
                    <input  value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="inputPassword" className="form-control" placeholder="Password"/>
                    <label htmlFor="inputPassword">Password</label>
                  </div> 
    
                  <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                    <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                  </div>
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div> }
      </div>
    );
};

export default Login;