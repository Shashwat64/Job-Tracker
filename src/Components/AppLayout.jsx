import { Link, Outlet } from 'react-router-dom'

//components
import MainNav from './MainNav'

export default function AppLayout(){
  return (
      <div className="flex"> {/* This is the wrapper Div */}
        <MainNav/>
        <Outlet/>
      </div>
  )
}