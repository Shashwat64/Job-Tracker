import { RouterProvider} from "react-router-dom"
import { useState, createContext} from "react"
import { router } from "./router"

import { useEffect, useRef } from "react"


import { getAllDataOfUser, updateInterview} from './api/users'

import applicationsList from './data/interviewList'

export const JobContext = createContext()


export default function App() {

  useEffect(() => {
    const isSafari = 
      /Safari/.test(navigator.userAgent) &&
      !/Chrome/.test(navigator.userAgent) &&
      !/CriOS/.test(navigator.userAgent) &&
      !/FxiOS/.test(navigator.userAgent)

    if (isSafari) {
      alert("Safari may block login due to strict privacy settings. For best experience, use Chrome or Edge.");
    }
  }, [])


  const [applicationJson, setApplicationJson] = useState(null)
  const [activeBtn, setActiveBtn] = useState('all')

  const [theme, setTheme] = ("dark")

  const [userData, setUserData] = useState(null)


  console.log(applicationJson)

  return (
    <>
      {/* Global Providers Here */}
      
      <JobContext.Provider value={{
        applicationJson, //interviewJson
        setApplicationJson, //setInterviewJson
        activeBtn, 
        setActiveBtn,
        theme, 
        setTheme,
        userData, 
        setUserData
      }}>
        <RouterProvider router={router} />
      </JobContext.Provider>
    
    </>
  )
}
