import React from 'react'
import Masonry from "react-masonry-css"
import Pin from '../component/Pins/selfComponent/Pin'
function MasonryLayout({pins}) {
    const BreakPointObj ={
        default:4,
        3000:5,
        2000:4,
        1000:3,
        700:2
    }
  return (
    <Masonry className='flex flex-row' breakpointCols={BreakPointObj}>
        {pins && pins?.map(pin =>(
            <Pin pin={ pin } key={pin._id}/>
        ))}
    </Masonry>
  )
}

export default MasonryLayout