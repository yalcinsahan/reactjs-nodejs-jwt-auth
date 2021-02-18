import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Login from './components/Login';
import Navbar from './components/Navbar';
import UserContext from './context/userContext'


function App() {

  const [currentUser,setcurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || {id: ""})

  const changeCurrentUser= (user)=>{
      setcurrentUser(user)
      console.log(user);
  }

  const logout = () =>{
    localStorage.removeItem("user")
    setcurrentUser({id:""})
  }

  return (
    <UserContext.Provider value={{currentUser,changeCurrentUser,logout}}>
    <div>
      <Navbar/>
    </div>
    </UserContext.Provider>
  );
}

export default App;
