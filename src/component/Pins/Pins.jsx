import React from 'react'
import { Route,Routes } from 'react-router-dom'
import {CreatePin,Feed,PinDetail,NavBar,Search} from "./selfComponent"
function Pins({user}) {
    const [SearchTem,setSearchTerm] =React.useState('')
    return (
    <div className='px-2 md:px-5'>
        <div className='bg-gray-50'>
        <NavBar SearchTerm={SearchTem} setSearchTerm={setSearchTerm}  user={user}/>
        </div>
        <div className='h-full'>
            <Routes>
                <Route path="/" element={<Feed/> }/>
                <Route path="/catagory/:catagoryId" element={<Feed/> }/>
                <Route path="/pin-detail/:pinId" element={<PinDetail user={user}/> }/>
                <Route path="/create-pin" element={<CreatePin user={user}/> }/>
                <Route path="/search" element={<Search SearchTem={SearchTem} setSearchTerm={setSearchTerm}/> }/>
            </Routes>
        </div>
    </div>
  )
}

export default Pins