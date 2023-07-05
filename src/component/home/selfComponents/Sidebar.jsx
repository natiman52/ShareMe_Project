import React from 'react'
import {NavLink,Link} from "react-router-dom"
import {IoIosArrowForward} from "react-icons/io"
import {RiHomeFill} from "react-icons/ri"
import logo from "../../../assets/logo.png"
import {categories} from "../../../utils/client"
function Sidebar({user,closetoggle}) {
  const HandleClose = () =>{
    if(closetoggle) closetoggle(false)
  }
  const isNotActiveStyle ="flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration ease-in-out capitalize"
  const isActiveStyle ="flex items-center px-5 gap-3 font-extrabold border-black border-r-2 hover:text-black transition-all duration ease-in-out capitalize"

  return (
    <div className='ml-2 bg-white flex flex-col justify-between w-full h-full overflow-y-auto min-w-210'>
      <div className='flex flex-col'>
      <Link
      to="/"
      className='flexpx-5 my-6 pt-1 w-190 items-center'
      onClick={HandleClose}
      >
      <img src={logo} alt="logo" className='w-full'/>
      </Link>
      <div className='flex flex-col gap-5'>
      <NavLink
      to="/"
      className={({isActive}) => isActive ? isActiveStyle :isNotActiveStyle}
      onClick={HandleClose}
      >
        <RiHomeFill /> Home
      </NavLink>
      <h3 className='mt-2 px-5 text-base 2xl:text-xl'>discover catagory</h3>
      {
        categories.map((catagory) => (
          <NavLink
          to={`catagory/${catagory.name}`}
          className={({isActive}) => isActive ? isActiveStyle :isNotActiveStyle}
          onClick={HandleClose}
          key={catagory.name}
          >
            <img src={catagory.image} alt="" className='rounded-full w-9 h-9' />
            {catagory.name}
          </NavLink>
        ))
      }
      </div>
      </div>
      {user && (
        <Link to={`/userprofile/${user.userID}`}
         className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
         >
          <img src={user.pictureURL} referrerPolicy="no-referrer" className="w-10 h-10 rounded-lg" />{user.name}
        </Link>
      )}
    </div>
  )
}

export default Sidebar