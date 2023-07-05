import React from 'react'
import { FeedQuery,searchQuery } from '../../../utils/Query'
import client from '../../../utils/client'
import Spinner from '../../../Extras/Spinner'
import MasonryLayout from '../../../Extras/MasonryLayout'
function Search({SearchTem,setSearchTerm}) {
  const [Pins,setPins] = React.useState()
  const [Loading,setLoading]=React.useState(true)
  React.useEffect( () => {
    if(SearchTem == ""){
      setLoading(true)
client.fetch(FeedQuery).then(data => {
  setPins(data)
  setLoading(false)
})
    }else{
      setLoading(true)
      const query = searchQuery(SearchTem)
      client.fetch(query).then(data => {
        setLoading(false)
        setPins(data)
      })
    }

  },[SearchTem])
  console.log(Pins)
  if(Loading) return <Spinner message="Loading Results.."/>
  return (
    <div>

      {SearchTem == ""?
        <MasonryLayout pins={Pins}/>
      :
  (
        Pins?.length < 1?
      (
        <div className='flex w-full justify-center items-cetner'>
          <h2 className='text-extrabold text-xl'>no pins found</h2>
        </div>
      )
      :<MasonryLayout pins={Pins}/>
  )
    }
    </div>
  )
}

export default Search