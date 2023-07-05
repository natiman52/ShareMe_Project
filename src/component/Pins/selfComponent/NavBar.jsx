import React from 'react'
import { IoMdSearch,IoMdAdd } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

function NavBar({SearchTerm,setSearchTerm,user}) {
  const navigate = useNavigate()
   if(!user) {
    return null
  }  
  return (
    <div className='flex gap-2 md-gap-5 w-full mt-5 pb-7'>
        <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
    <IoMdSearch fontSize={30} className="ml-1"/>
    <input type="text" onChange={(e) =>{
      navigate('search/')
      setSearchTerm(() => e.target.value)} }
    placeholder="Search"
    value={SearchTerm}
    className="p-2 w-full bg-white outline-none"
    />
        </div>
        <div className='flex gap-3'>
          <Link
          to={`userprofile/${user?.userID}`}
          className="hidden md:block"
          >
            <img src={user.pictureURL} alt="" className='w-12 h-12 rounded-md' />
          </Link>
          <Link
          to="create-pin"
          className='bg-black text-white rounded-lg w-12 h-12 flex justify-center items-center'
          >
            <IoMdAdd />
          </Link>
        </div>
        </div>
  )
}

export default NavBar