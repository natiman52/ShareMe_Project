import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import  client from "../../../utils/client"
import MasonryLayout from '../../../Extras/MasonryLayout'
import { userQuery,userCreatedPinsQuery,userSavedPinsQuery } from '../../../utils/Query'
import {googleLogout } from "@react-oauth/google"
import Spinner from '../../../Extras/Spinner'
import axios from 'axios'




const Active = "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none"
const notActive ="bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none"


function UserProfile({user}) {
  const [User,setUser] = React.useState(null)
  const [image,setImage] =React.useState(null)
  const [loading,setLoading] = React.useState()
  const [Text,setText] =React.useState("Created")
  const [Pins,setPins] =React.useState()
  const [ActiveBtn,setActiveBtn] = React.useState("Created")
  const navigate = useNavigate()
  const {userId} = useParams()
  const logout = () =>{
    window.localStorage.clear()
    navigate('/login')
  }
  React.useEffect(() =>{
        const randomImage = async () => {
  await axios("https://api.unsplash.com/photos/random/?client_id=detKj4wQ0KHTLJmvU-SuiALx8I3sW_iiif6w40N_18k&query=Technology,Nature&count=1").then(e =>{
   setImage(e.data[0].urls.full)
  }).error(e=>{
    console.log(e.response())
  })
  }
    randomImage()
  },[])
  React.useEffect( () =>{
    const query = userQuery(userId)
    client.fetch(query).then( data => {
      setUser(data[0])
    }
    )
  },[userId])
  React.useEffect( () =>{
    if(Text === "Created"){
      setLoading(true)
      const query = userCreatedPinsQuery(userId)
      client.fetch(query).then( data => {
        setLoading(false)
        setPins(data)
      }
      )
    }else if(Text === "Saved"){
      setLoading(true)
      const query = userSavedPinsQuery(userId)
      client.fetch(query).then( data => {
        setLoading(false)
        setPins(data)
      }
      )
    }
  },[Text,userId])
  console.log(image)
  if(!User && !image) return <Spinner message="loading profile..." />
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col items-center justify-center'>
    <img className='w-full h-370 2xl:h-510 shadow-lg object-cover' src={image} alt="banner" />
          <img src={User.image} className='rounded-full w-23 h-23 -mt-10 shadow-xl object-cover' alt="" />
          <h1 className="font-bold text-3xl text-center mt-3 ">
            {User.username}
          </h1>
          <div className='absolute top-0 z-1 right-0 p-2'>
{userId === user.userID && (
  <button onClick={logout} className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'>
    <AiOutlineLogout color='red' fontSize={21}/>
    </button>
)}
          </div>
          </div>
          <div className='text-center mb-7'>
          <button type='button' onClick={(e) => {
            setText(data => e.target.textContent)
            setActiveBtn("Created")
          } }
          className={`${ActiveBtn ==="Created" ? Active : notActive }`}>
            Created
          </button>
        <button type='button'
        className={`${ActiveBtn ==="Saved" ? Active : notActive }`}
        onClick={(e) => {
          setText(data => e.target.textContent)
          setActiveBtn("Saved")
        } }>
          Saved
        </button>
          </div>
          <div className='px-2 '>

            {!loading ?
            Pins.length > 0
            ?<MasonryLayout pins={Pins}/>
            :(
              <div className='flex justify-center items-center'><p className='text-extrabold text-xl '>No pins Created</p></div>
            )
        :
        <Spinner message="Loading Pins..." />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
