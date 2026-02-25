import React from "react"
import { Link } from 'react-router-dom'

export default function LandingPage(){
  return (
    <>
      <nav>This is Landing Page</nav>
      <Link to="app">To Dashboard</Link>
    </>
)
}