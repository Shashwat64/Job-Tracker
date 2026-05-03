import { Link, NavLink } from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from 'react'

//context
import { JobContext } from '../App'

//types
import type { JobContextType } from '../../types/types'
import type { LucideIcon } from "lucide-react";

//logo and icon
import logoOrange from '../assets/logoOrange.png'
import squareIconDark from '../assets/squareIconDark.png'
import logoTransparent from '../assets/logoTransparent.png'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { LayoutDashboard, Briefcase, MessagesSquare, Binoculars, FileUser, CalendarDays, Send, Settings} from 'lucide-react'

import ProfileDropdown from './MainNavChildren/ProfileDropdown'


export default function MainNav(){
    const {setApplicationJson, activeBtn, userData, setActiveBtn, setUserData }:JobContextType = useContext(JobContext)!
  console.log("userData in Main nav", userData)
    const [isCollapsed, setIsCollapsed] = useState(false)

  const [isProfileOpen, setIsProfileOpen]= useState(false)


  useEffect(() => {
    const handleResize = () => {
      // Check the window width. 768px is a standard breakpoint for tablets/mobile.
      // If the screen is smaller than 768px, collapse the menu. 
      // If it's larger, open it.
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    }

    // 3. Call it once immediately when the component mounts 
    // so it sets the correct state on initial page load
    handleResize();

    // 4. Set up the event listener to watch for window resizing
    window.addEventListener('resize', handleResize);

    // 5. IMPORTANT: Clean up the event listener when the component unmounts
    // to prevent memory leaks in your React app.
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  type NavItem = {
    to: string;
    label: string;
    icon: LucideIcon;
  }

  console.log(isCollapsed)

  function NavItem({ to, icon: Icon, label }:NavItem) {
    return (
      <NavLink to={to} draggable="false">
        {({ isActive }) => (
          <div
            className={`
              flex items-center p-2 gap-1 rounded-md 
              transition-all duration-100 ease-in-out text-sm
              ${isActive
                ? "bg-background border border-border text-black"
                : "hover:bg-gray-100 hover:text-black text-gray-600"}
            `}
          >
            <Icon size={isCollapsed ? 22 : 16 } />
            {!isCollapsed ? label : ""}
          </div>
        )}
      </NavLink>
    )
  }

  const dropdownRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsProfileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);

  return () =>
    document.removeEventListener("mousedown", handleOutsideClick);
}, [])

  if(!userData) return


  return (
    <aside className="flex flex-col fixed top-0 bottom-0 left-0 p-4 bg-white h-screen  border-r border-gray-200 select-none text-text-primary lg:w-60">
     
      <Link to="/">
        <div className="flex items-center justify-center py-2 px-1 pb-4 border-b border-gray-200 h-12">
          <img src={logoOrange} alt="logo"  className="object-cover self-center w-40 hidden lg:block" />
          <img src={logoTransparent} alt="logo"  className="object-cover self-center w-10 lg:hidden" />
          {/* <button className='ml-4'>-</button> */}
        </div>
      </Link>

      <nav className="flex flex-col items-center lg:items-stretch gap-4 py-4 grow">
        <div>
          <p className="text-gray-400 text-sm hidden lg:block">Main</p>
          <NavLink to="dashboard" draggable="false">
            {({ isActive }) => (
              <div
                className={`
                  flex items-center p-2 mb-0 gap-1 rounded-md 
                  transition-all duration-100 ease-in-out text-sm
                  ${isActive ? "bg-background " : "hover:bg-gray-100 hover:text-black"}
                `}
              >
                <LayoutDashboard size={isCollapsed ? 22 : 16 } />
                {isCollapsed ? "" : "Dashboard"}
              </div>
            )}
          </NavLink>
        </div>


        <div className="flex flex-col">
          <p className="text-gray-400 text-sm hidden lg:block" >Job Board</p>
          <NavItem to="jobs" icon={Briefcase} label="Jobs" />
          <NavItem to="interview" icon={MessagesSquare} label="Interview" />
          <NavItem to="saved-resume" icon={FileUser} label="Saved Resume" />
          <NavItem to="survey-request" icon={Binoculars} label="Survey Request" />
        </div>

        <div className="flex flex-col">
          <p className="text-gray-400 text-sm hidden lg:block">Tools</p>
          
          <NavItem to="events" icon={CalendarDays} label="Events" />
          <NavItem to="report-an-exit" icon={Send} label="Report An Exit" />
          <NavItem to="settings" icon={Settings} label="Settings" />
        </div>

      </nav>
      <div 
        className='relative'
        ref={dropdownRef}
        draggable="false">
        <div
          onClick={()=>{setIsProfileOpen(prev=>!prev)}} 
          
          className="p-2 flex items-center gap-2 border-t w-full border-gray-200 hover:bg-gray-100 hover:text-black transition-all duration-100 ease-in-out rounded-md"
        >
          <img className="w-10 h-10 shrink-0 rounded-full overflow-hidden object-cover object-[50%_50%]" src="https://i.imgur.com/F9Nf9Fx.jpeg" />
          <div className='flex items-center justify-between w-full'>
            <div>
              {!isCollapsed && (userData.first_name.length < 15 ? <p>{userData.first_name}</p> : <p>{userData.first_name.split(' ')[0]}</p>)}
            </div>

            {!isCollapsed && <ChevronUpIcon className={`w-4 h-4 text-gray-400 ${isProfileOpen ? 'rotate-180' : ''}`}strokeWidth={2.5} />}
            
           
          </div>
        </div>
            {isProfileOpen && <ProfileDropdown isCollapsed={isCollapsed}/>} 
      </div>
    </aside>
  ) 
}