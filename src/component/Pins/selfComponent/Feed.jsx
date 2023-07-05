import React,{useState} from 'react'
import {useParams} from "react-router-dom"
import Client,{urlFor} from "../../../utils/client"
import MasonryLayout from '../../../Extras/MasonryLayout'
import Spinner from '../../../Extras/Spinner'
import {searchTerm,FeedQuery} from "../../../utils/Query"
import client from '../../../utils/client'
function Feed() {
  const [Loading, setLoading] = useState(false)
  const {catagoryId} =useParams()
  const [Pins, setPins] = useState(null)
  React.useEffect( () =>{
    setLoading(true)
    if(catagoryId){
      const Query = searchTerm(catagoryId)
        client.fetch(Query).then( (data) =>{
          setPins(data)
          setLoading(false)
        })
    }else{
      Client.fetch(FeedQuery).then( data =>{
        setPins(data)
        setLoading(false)
      })
    }
  },[catagoryId])
  if(Loading) return <Spinner message="we are bringing you intersting things"/>
  if(!Pins?.length) return <h2>No pins </h2>
  return (
    <MasonryLayout pins={Pins}/>
  )
}

export default Feed