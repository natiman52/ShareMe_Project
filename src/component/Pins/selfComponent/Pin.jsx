import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {MdDownloadForOffline} from "react-icons/md"
import {AiTwotoneDelete} from "react-icons/ai"
import {BsFillArrowUpRightCircleFill} from "react-icons/bs"
import client,{ urlFor } from '../../../utils/client'
import {v4 as uuidv4} from "uuid"

function Pin({pin:{image,destination,postedby,save,_id}}) {
    const [pinHovered, setPinHovered] = React.useState(false)
    const [Saving,setSaving] = React.useState(false)
    const user = JSON.parse(localStorage.getItem("user"))
    const [Saved,setSaved] =React.useState(!!(save?.filter( item => item.postedby._id == user.userID)?.length)) 
    const navigate = useNavigate()
    console.log(Saved)
    const AddPinSave = id =>{
        if(!Saved){
            setSaving(true)
            client.patch(id).setIfMissing({ save : [] }).insert('after',"save[-1]",[{
                _key:uuidv4(),
                userid : user.userID,
                postedby:{
                    _type:"postedby",
                    _ref:user.userID,
                }
            }]).commit().then( () => {
                window.location.reload()
            })
        }
  }
  const DeletePin = (id) =>{
    client.delete(id).then(e => {
        window.location.reload()
    })
  }
    return (
    <div className='m-2'>
        <div onMouseEnter={() => setPinHovered(true)}
            onMouseLeave={() => setPinHovered(false)}
            className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            onClick={() => navigate(`/pin-detail/${_id}`)}
        >
        <img className='rounded-lg w-full' src={urlFor(image).width(250).url()}/>
    {pinHovered && (
        <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50' style={{height:"100%"}}>
            <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
                <a href={`${image?.asset?.url}?dl=`}
                download
                onClick={(event) => event.stopPropagation() }
                className="ml-1 bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-lg"
                >
                    <MdDownloadForOffline/>

                </a>
            </div>

                {Saved 
                ?(
                    <button onClick={e => e.stopPropagation() } className='bg-red-500 rounded-3xl text-base text-white px-5 py-1 opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
                     saved
                    </button>
                )
                :(
                    <button onClick={(e) =>{
                        e.stopPropagation()
                        AddPinSave(_id)
                    }} className='bg-red-500 rounded-3xl text-base text-white px-5 py-1 opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
                        {Saving ? "saving":"save"}
                    </button>
                )
                }
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
                {
                    destination && (
                        <a
                        onClick={e => e.stopPropagation()}
                        className='flex items-center gap-2 font-bold p-2 bg-white text-black rounded-3xl opacity-75 hover:opacity-100'
                         href={`${destination}`} target="_blank" rel='noreferrer'>
                             <BsFillArrowUpRightCircleFill/>
                             {destination.slice(8,20)}

                        </a>
                    )
                }
                {
                    postedby._id == user.userID && (
                        <div>
                            <button onClick={(e) =>{
                        e.stopPropagation()
                        DeletePin(_id)
                    }} className='bg-white p-2 rounded-3xl text-base text-dark opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                            >
                                <AiTwotoneDelete/>
                            </button>
                        </div>
                    )
                }
            </div>
            </div>
    )}
        </div>
        <Link to={`/userprofile/${postedby?._id}`} className="flex gap-2 mt-2 items-center">
                <img
                className='w-8 h-8 rounded-full object-cover'
                src={postedby?.image}
                />
                <p className='font-semibold capitalize'>{postedby?.username}</p>
        </Link>
    </div>
  )
}

export default Pin