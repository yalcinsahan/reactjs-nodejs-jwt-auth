import axios from 'axios' 
import { useContext } from 'react';
import UserContext from '../context/userContext';
import { authHeader } from './user.service';

export const login = (email,password) => {

    return axios.post("http://localhost:8000/login",{email,password})
    .then((response)=>{
        if(response.data.accessToken){
            localStorage.setItem("user",JSON.stringify(response.data))            
        }

        return response.data;
    })

}

export const register = (email,name,password) => {

    return axios.post("http://localhost:8000/register",{email,name,password});

}

export const customData = () =>{
    return axios.get("http://localhost:8000/customdata",{headers: authHeader()});
}
