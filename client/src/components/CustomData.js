import React, { useContext, useState } from 'react';
import UserContext from '../context/userContext';
import {customData} from '../services/auth.service'

const CustomData = () => {

    const [message,setMessage] = useState("")

    customData().then((result)=>{
        setMessage(result.data.message)
    }).
    catch(err=>setMessage("bu alanı görmeye yetkiniz yok."))

    return (
        <div>
            <h4 className="text-white text-center mt-5">{message}</h4>
        </div>
    );
};

export default CustomData;