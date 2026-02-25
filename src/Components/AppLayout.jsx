import { Link, Outlet } from 'react-router-dom'

//components
import MainNav from './MainNav'

export default function AppLayout(){
  return (
    <>
      <h2 className=''>This is root layout</h2>
      <MainNav/>
      <Link to="/dashboard">Dashboard</Link>
      <Outlet/>
    </>
  )
}