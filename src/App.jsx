import { RouterProvider} from "react-router-dom"
import { useState, createContext} from "react"
import { router } from "./router"

import interviewList from './data/interviewList'

export const JobContext = createContext()


export default function App() {


  const [interviewJson, setInterviewJson] = useState(interviewList)

  return (
    <>
      {/* Global Providers Here */}
      <JobContext.Provider value={{
        interviewJson,
        setInterviewJson
      }}>
        <RouterProvider router={router} />
      </JobContext.Provider >
    </>
  )
}
