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
    <GoogleOAuthProvider clientId='1089074278120-h8o7tpiro5vau09hr4k8m775bas3s9rk.apps.googleusercontent.com'>
    <Routes>
      <Route path='/*' element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </GoogleOAuthProvider>
  )
}

export default App
