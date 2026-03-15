import { RouterProvider} from "react-router-dom"
import { useState, createContext} from "react"
import { router } from "./router"

import { useEffect } from "react"

import { Analytics } from "@vercel/analytics/react"

import getUserDetails from "./api/users"

import interviewList from './data/interviewList'

export const JobContext = createContext()


export default function App() {


  const [interviewJson, setInterviewJson] = useState(interviewList)
  const [activeBtn, setActiveBtn] = useState('all')

  const [theme, setTheme] = ("dark")

  console.log(interviewJson)

  //practise for the server
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsers() {
      const res = await fetch("http://localhost:8000/users")
      const data = await res.json()
      setUsers(data)
    }

    // getUsers()
    getUserDetails(1)
  }, [])

  console.log(users)

  // async function createUser() {
  //   const res = await fetch("http://localhost:8000/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       email: "aryan@example.com",
  //       password: "hello"
  //     })
  //   })

  //   const data = await res.json()
  //   console.log(data)
  // }

  // createUser()

  // async function deleteUser() {
  //   const res = await fetch("http://localhost:8000/users/1", {
  //     method: "DELETE"
  //   })

  //   const data = await res.json()
  //   console.log(data)
  // }

  // deleteUser()




  return (
    <>
      {/* Global Providers Here */}
      <JobContext.Provider value={{
        interviewJson,
        setInterviewJson,
        activeBtn, 
        setActiveBtn,
        theme, 
        setTheme
      }}>
        <RouterProvider router={router} />
      </JobContext.Provider >
    </>
  )
}
