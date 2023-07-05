import React , { useState }  from 'react'
import Vedio from "../../assets/share.mp4"
import image from "../../assets/logowhite.png"
import {FcGoogle} from "react-icons/fc"
import { ThreeCircles } from 'react-loader-spinner'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import client from '../../utils/client'
import {useNavigate} from "react-router-dom"
function Login() {
  const [Start,setStart] = React.useState(false)
  const [Data,setData]=useState("")
  const [Loading,setLoading]=useState(true)
  const navigate =useNavigate()
  const userCheck = window.localStorage.getItem('user')
  const logintest = useGoogleLogin({
    onSuccess:async tokenResponse => {
      setStart(true)
          await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${tokenResponse.access_token}`}}).then(e =>{
        localStorage.setItem("user",JSON.stringify({'name':e.data.name,"email":e.data.email,'pictureURL':e.data.picture,"userID":e.data.sub}))
        const user = {
          _id:e.data.sub,
          _type:"user",
          username:e.data.name,
          image:e.data.picture,
          email:e.data.email
        }
        client.createIfNotExists(user).then(e =>{
          setLoading(false)
          navigate("/")
        })
    }) 
    },

  })
  if(userCheck) {
    navigate("/")
  }
  return (
    <div className='flex justify-start w-screen h-screen '>
        <div className='relative w-full h-full'>
        <video
            src={Vedio}
            type="video/mp4"
            controls={false}
            muted
            loop
            autoPlay
            className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center bottom-0 top-0 left-0 right-0   bg-blackOverlay'>
            <div className='p-5'>
            <img className='opacity-100 h-10 w-100 object-fill' src={image}/>
            </div>
            <div>

              {
        Start
        &&        
        Loading?
        <button onClick={ () => logintest() } className='bg-mainColor flex justify-content items-center p-3 rounded-lg'>
        <ThreeCircles
     height="30"
     width="80"
     color="blue"
     wrapperStyle={{}}
     wrapperClass=""
     visible={true}
     ariaLabel="three-circles-rotating"
     outerCircleColor=""
     innerCircleColor=""
     middleCircleColor=""
   />
         </button>
      :
      <button onClick={ () => logintest() } className='bg-mainColor flex justify-content items-center p-3 rounded-lg'>
      <FcGoogle/> Sign In With Google
      </button>
              }

        </div>
        </div>
        </div>
    </div>
  )
}

export default Login