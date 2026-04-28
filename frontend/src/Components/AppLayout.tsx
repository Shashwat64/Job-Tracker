import { Link, Outlet, useLoaderData, redirect } from 'react-router-dom'
import { useContext } from 'react'

//data
import applicationsList from '../data/interviewList'

//api
import { getAllDataOfUser, /* resetData */ isSignedIn} from '../api/users'

//components
import MainNav from './MainNav'

//context
import { JobContext } from '../App'
import { useEffect } from 'react'

let called = false

export async function loader(){

  const userDataFromDB  = await isSignedIn(); 

  if (!userDataFromDB) {
    return redirect('/signin', { replace: true }); 
  }
  
  console.log(userDataFromDB.id)
  const applicationData = await getAllDataOfUser(userDataFromDB.id);
  return {userDataFromDB, applicationData}
  
}

export default function AppLayout(){
  const { applicationJson, setApplicationJson, userData, setUserData } = useContext(JobContext)
  
  const {userDataFromDB, applicationData} = useLoaderData()

  // console.log("data from loader is", userData)
  // console.log("data signedIn from loader is", signedIn)
  
  useEffect(() => {
    async function initData() {
      setUserData(userDataFromDB)

      setApplicationJson(applicationData)
      /* if(!called && userDataFromDB.id===1){
        called = true;
        await resetData(applicationsList)
      } */
    }

    initData()
  }, [])


  return (
    applicationJson ? 
      <div className="flex h-screen"> {/* This is the wrapper Div */}
        <MainNav/>
        <Outlet/>
      </div> : null
    
  )
}