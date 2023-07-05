import React,{useState,useEffect} from 'react'
import {MdDownloadForOffline} from "react-icons/md"
import {useParams,Link} from "react-router-dom"
import {v4 as uuidv4} from "uuid"
import client,{urlFor} from "../../../utils/client"
import MasonryLayout from "./../../../Extras/MasonryLayout"
import {pinDetailQuery,pinDetailMorePinQuery} from "../../../utils/Query"
import Spinner from "../../../Extras/Spinner"
function PinDetail({user}) {
  const [pins, setPins] = useState(null)
  const [pinDetail,setPinDetails] =useState(null)
  const [comment,setComment] = useState("")
  const [addingComment,setAddingComment]=useState(false)
  const {pinId} = useParams()
  console.log(pinDetail?.postedby?._id)
  const addComment = e =>{
    if(comment){
      setAddingComment(true)
      client.patch(pinId).setIfMissing({comments: []}).insert("after",'comments[-1]',[{
        comment,
        _key:uuidv4(),
        postedby:{
          _type:"postedby",
          _ref:user.userID,
        }
      }]).commit().then( () => {
        fetchPinDetail()
        setComment("")
        setAddingComment(false)
      })
    }
  }
  const fetchPinDetail = () =>{
    let query = pinDetailQuery(pinId)
    if(query){
      client.fetch(query).then(data => {
        setPinDetails(res => data[0])
        if(data){
          query =pinDetailMorePinQuery(pinId)
    
          client.fetch(query).then( data =>{
            setPins(data)
          })
        }
      })
    }
  }
  useEffect( () =>{
    fetchPinDetail()
  }, [ pinId])
  if(!pinDetail) return <Spinner message="Loading "/>
  console.log(pinDetail)
  return (
    <>
    <div className='flex xl-flex-row flex-col m-auto bg-white' style={{maxWidth:"1500px",borderRadius:"32px"}}>
      <div className='flex justify-center items-center md:items-start flex-initial'>
      <img src={pinDetail?.image && urlFor(pinDetail.image).url()} alt="user-post" className='rounded-t-3xl rounded-b-lg w-100' />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
          <a href={`${pinDetail?.image?.asset?.url}?dl=`}
                download
                onClick={(event) => event.stopPropagation() }
                className="ml-1 bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-lg"
                >
                    <MdDownloadForOffline/>

                </a>
          </div>
          <a href={pinDetail?.destination} target="_blank" rel="noreferrer">
            {pinDetail?.destination}
          </a>
        </div>
        <div>
          <h1 className='text-4xl font-bold break-words mt-3'>
            {pinDetail?.title}
          </h1>
          <p className='mt-3 text-lg'>{pinDetail?.about}</p>
          <Link to={`/userprofile/${pinDetail?.postedby?._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
                <img
                className='w-8 h-8 rounded-full object-cover'
                src={pinDetail?.postedby?.image }
                />
                <p className='font-semibold capitalize'>{pinDetail?.postedby?.username}</p>
        </Link>
        <h2 className='mt-5 text-2xl'>Comments</h2>
        <div className='max-h-370 overflow-y-auto'>
    {pinDetail?.comments?.map( comment =>(
      <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={comment._id}>
        <img src={comment.postedby.image} 
        alt="user-profile"
        className='w-10 h-10 rounded-full cursor-pointer'/>
        <div className='flex flex-col'>
          <p className='font-bold'>{comment.postedby.username}</p>
          <p>{comment.comment}</p>
        </div>
      </div>
    ))}
        </div>
        <div className='flex flex-wrpa mt-6 gap-6'>
        <Link to={`/userprofile/${pinDetail?.postedby?._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
                <img
                className='w-10 h-10 rounded-full cursor-pointer'
                src={pinDetail?.postedby?.image }
                />
        </Link>
        <input type="text" placeholder='Add a comment' className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300' value={comment} onChange={e => setComment(e.target.value) }/>
       <button onClick={addComment} className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'>
{addingComment? "posting" : "post"}
       </button>
        </div>
        </div>
      </div>
    </div>
    {pins ? 
    pins.length > 1 
    ? (
      
      <div>
        <h2 className='text-bold text-center text-2xl mt-3 mb-2'> more pins</h2>
        <MasonryLayout pins={pins}/>
      </div>

    )
    :
    (
  <div></div>
    )
    :
      <Spinner message="loading more pins" /> }
    </>
  )
}

export default PinDetail