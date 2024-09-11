import { useState,useEffect } from 'react'
import './App.css'
import {Routes,Route,useNavigate} from "react-router-dom"
import Home from "./component/home/Home"
import Login from "./component/login/Login"
import {GoogleOAuthProvider} from "@react-oauth/google"
function App() {
  const navigate = useNavigate()
  useEffect(() =>{
    if(!window.localStorage.getItem("user")){
      navigate("/login")
    }
  },[window.localStorage.getItem("user")])
  return (
    <GoogleOAuthProvider clientId='65895017028-ii139g3ovkrurmhkbaevr6dkmq19aq9l.apps.googleusercontent.com'>
    <Routes>
      <Route path='/*' element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </GoogleOAuthProvider>
  )
}

export default App
