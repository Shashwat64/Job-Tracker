import { RouterProvider} from "react-router-dom"
import { useState, createContext} from "react"
import { router } from "./router"

import { Analytics } from "@vercel/analytics/react"

import interviewList from './data/interviewList'

export const JobContext = createContext()


export default function App() {


  const [interviewJson, setInterviewJson] = useState(interviewList)
  const [activeBtn, setActiveBtn] = useState('all')

  // console.log(interviewJson)

  return (
    <>
      {/* Global Providers Here */}
      <JobContext.Provider value={{
        interviewJson,
        setInterviewJson,
        activeBtn, 
        setActiveBtn
      }}>
        <RouterProvider router={router} />
      </JobContext.Provider >
    </>
  )
}
