import React,{useState} from 'react'
import {AiOutlineCloudUpload} from "react-icons/ai"
import {MdDelete} from "react-icons/md"
import {useNavigate} from "react-router-dom"
import { categories } from '../../../utils/client'
import client from "../../../utils/client"
import Spinner from "../../../Extras/Spinner"
function CreatePin({user}) {
  const [Title, setTitle] = useState("")
  const [Destination, setDestination] = useState("")
  const [About, setAbout] = useState("")
  const [Loading, setLoading] = useState(false)
  const [Catagory, setCatagory] = useState(null)
  const [ImageAssets, setImageAssets] = useState(null)
  const [Fields, setFields] = useState(false)
  const [WrongImageType, setWrongImageType] = useState(false)
  const navigate = useNavigate()
  const UploadImage = (e) => {
const {type,name} = e.target.files[0]
if (type === "image/png" || type === "image/svg" ||type === "image/jpeg"||type === "image/gif" || type === "image/tiff" ){
  setWrongImageType(false)
  setLoading(true)

  client.assets.upload("image",e.target.files[0], {contentType : type, filename:name} ).then( e => {
     setImageAssets(e)
     setLoading(false)
  }).catch( e => {
    console.log("upload error")
  })
}else {
  setWrongImageType(true)
}
  }
  const savePin = () =>{
    if(Destination && Title && About && ImageAssets?._id && Catagory) {
      const doc ={
        _type : "pin",
        title:Title,
        about:About,
        destination:Destination,
        image:{
          _type:"image",
          asset:{
            _type:"reference",
            _ref:ImageAssets?._id
          }
        },
        userid:user.userID,
        postedby:{
          _type:"postedby",
          _ref:user.userID
        },
        category:Catagory
      }
      client.create(doc).then(e => {
        navigate("/")
      })
    }else{
      setFields(data => true)
      setTimeout(( ) => setFields(data => false),2000)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {
        Fields && (
          <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>Please fill in all fields</p>
        )
      }
      <div className='flex flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
      <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
      <div className='flex justify-center items-center  flex-col border-2 border-dotted  border-gray-300 p-3 w-full h-420'>
      {
        Loading && <Spinner/>
      }
      {
        WrongImageType && <p>Wrong Image Type</p>
      }
      {
        !ImageAssets ? (
          <label>
            <div className='flex flex-col items-center justify-center h-full '>
            <div className='flex flex-col justify-center items-center'>
          <p className='font-bold text-2xl'>
            <AiOutlineCloudUpload/>
          </p>
          <p className='text-lg'>Click to Upload</p>
            </div>
            <p className='mt-32 text-gray-400'> use high Quality JPG , PNG or TIFF less than 20 MB</p>
            </div>
            <input type="file" name='upload-image' onChange={UploadImage}  className="w-0 h-0" />
          </label>
        ):(
          <div
           className='relative h-full'>
            <img src={ImageAssets?.url} alt="uploaded_pic" className="h-full w-full"/>
            <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
              onClick={() => setImageAssets(data => null)}
            >
              <MdDelete/>
            </button>
           </div>
        )

      }

      </div>
      </div>

      <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
        <input
          type="text"
          value={Title}
          onChange={e => setTitle(data => e.target.value)}
          placeholder="Add your title"
          className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
        />
        {user && (
          <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
            <img src={user.pictureURL} className="w-10 h-10 rounded-full" />
            <p className='font-bold capitalize'> {user.name}</p>
          </div>
        )}
          <input
          type="about"
          value={About}
          onChange={e => setAbout(data => e.target.value)}
          placeholder="Add your about"
          className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
        />
                 <input
          type="about"
          value={Destination}
          onChange={e => setDestination(data => e.target.value)}
          placeholder="Add a Destination Link"
          className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
        />
        <div className='flex flex-col'>
          <div>
            <p className='mb-2 font-semibold text-lg sm:text-xl'>Choose pin catagory</p>
            <select onChange={e => setCatagory(data => e.target.value)}
            className="outline-none w-4/5 text-lg border-b-2 border-gray-200 p-2 rounded-md courser-pointer"
            >
              <option value="other" className='bg-white text-lg'>select Catagory</option>
              {
                categories.map( catagory =>(
                  <option className='text-base border-0 capitalize bg-white text-lg text-black' key={catagory.name} value={catagory.name}>{catagory.name}</option>
                ))
              }

            </select>
          </div>
          <div className="flex justify-end items-end mt-5">
            <button type='button' onClick={savePin} className="bg-red-500 text-white font-bold w-28 outline-none p-2 rounded-full">Save</button>
          </div>
        </div>
      </div>
      
      </div>
    </div>
  )
}

export default CreatePin