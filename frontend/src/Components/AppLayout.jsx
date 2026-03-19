import { Link, Outlet, useLoaderData } from 'react-router-dom'
import { useContext } from 'react'

//data
import applicationsList from '../data/interviewList'

//api
import { getAllDataOfUser, resetData} from '../api/users'

//components
import MainNav from './MainNav'

//context
import { JobContext } from '../App'
import { useEffect } from 'react'

let called = false

export async function loader(){
  if(!called){
    called = true;
  }
  const data = await getAllDataOfUser(1);
  return data
  
}

export default function AppLayout(){
  const { applicationJson, setApplicationJson } = useContext(JobContext)
  
  const data = useLoaderData()

  console.log("data from loader is", data)
  
  useEffect(() => {
  async function initData() {
    setApplicationJson(data)
    if(!called){
      called = true;
      await resetData(applicationsList)
    }
  }

  initData()
}, [])



  return (
      <div className="flex h-screen"> {/* This is the wrapper Div */}
        <MainNav/>
        <Outlet/>
      </div>
  )
}