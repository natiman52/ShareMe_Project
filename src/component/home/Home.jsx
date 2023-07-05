import React from 'react'
import {SideBar,UserProfile} from "./selfComponents"
import {HiMenu} from "react-icons/hi"
import logo from "../../assets/logo.png"
import {Link,Routes,Route,useNavigate} from "react-router-dom"
import {AiFillCloseCircle} from "react-icons/ai"
import Pins from '../Pins/Pins'
function Home() {
  const [User,setUser]=React.useState(localStorage.getItem("user")== "undifined"?false:JSON.parse(localStorage.getItem("user")))
  const [toggleSideBar,settoggleSideBar] =React.useState(false)
  const refScroll = React.useRef(null)
  React.useEffect(() =>{
    refScroll.current.scrollTo(0,0)
  },[])

  return (
    <>
    <div className='bg-gray-50 flex md:flex-row flex-col h-screen '>
    <div className='hidden md:flex h-screen   w-1/5 flex-initial'>
        <SideBar user={User && User} />
    </div>
    <div className='flex md:hidden flex-row '>
      <div className='p-2 w-full flex flex-row shadow-md justify-between items-center'>
    <HiMenu fontSize={40} onClick={(e) => settoggleSideBar(true)} className="cursor-pointer"/>
    <Link to="/">
    <img src={logo} alt="logo" className='w-28 '/>
    </Link>
    <Link to={`/userprofile/${User?.userID}`}>
    <img src={User?.pictureURL} className="w-10 "/>
    </Link>
      </div>
    {
      toggleSideBar 
      &&
      (
      <div className='fixed bg-white w-4/5 h-screen flex overflow-y-auto shadow-md z-10 animate-slide-in '>
        <div className='absolute w-full flex justify-end '>
        <AiFillCloseCircle fontSize={30} onClick={e => settoggleSideBar(false)} className='cursor-pointer'/>
        </div>
        <SideBar user={User && User} closetoggle={settoggleSideBar}/>
        </div>
      )
    }
    </div>
    <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={refScroll}>
    <Routes>
      <Route path="/userprofile/:userId" element={<UserProfile user={User}/>}/>
      <Route path="/*" element={<Pins user={User}/>} />
    </Routes>
    </div>
    </div>
   </> 
  )
}

export default Home