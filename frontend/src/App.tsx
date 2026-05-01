import { RouterProvider} from "react-router-dom"
import { useState, createContext} from "react"
import { router } from "./router"

import { useEffect, useRef } from "react"
import React from "react"

import type { JobContextType, Application, UserData } from "../types/types"


import { getAllDataOfUser, updateInterview} from './api/users'

import applicationsList from './data/interviewList'

export const JobContext = React.createContext<JobContextType | null>(null);


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

const [applicationJson, setApplicationJson] = useState<Application[]>([]);
  const [activeBtn, setActiveBtn] = useState<string | null>('all')

  const [userData, setUserData] = useState<UserData | null>(null)


  console.log(applicationJson)

  return (
    <>
      {/* Global Providers Here */}
      
      <JobContext.Provider value={{
        applicationJson, //interviewJson
        setApplicationJson, //setInterviewJson
        activeBtn, 
        setActiveBtn,
        userData, 
        setUserData
      }}>
        <RouterProvider router={router} />
      </JobContext.Provider>
    
    </>
  )
}
