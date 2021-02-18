import axios from 'axios' 
import { useContext } from 'react';
import UserContext from '../context/userContext';

export const login = (email,password) => {

    return axios.post("http://localhost:8000/login",{email,password})
    .then((response)=>{
        if(response.data.accessToken){
            localStorage.setItem("user",JSON.stringify(response.data))
               
            console.log(response.data);

        }

        return response.data;
    })

}

export const register = (email,name,password) => {

    return axios.post("http://localhost:8000/register",{email,name,password});

}
