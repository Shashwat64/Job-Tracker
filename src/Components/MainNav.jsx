import React from "react";
import { Link } from 'react-router-dom'

import { LayoutDashboard, Briefcase, MessagesSquare, Binoculars, FileUser, CalendarDays, Send, Settings} from 'lucide-react';


export default function MainNav(){
  return (
    <aside className="flex flex-col p-4 bg-white h-screen w-60 border-r border-gray-200">
      <Link to="/">
        <div className="flex py-2 px-1 border-b border-gray-200 h-12">
          <h1 className="text-2xl">Interview</h1>
          <button>-</button>
        </div>
      </Link>

      <nav className="flex flex-col gap-4 py-4 grow">
        <div>
          <p className="text-gray-400 text-sm">Main</p>
          <Link to="dashboard"className="text-sm" draggable="false">
            <div className="flex items-center p-2 mb-0 gap-1 hover:bg-gray-100 hover:text-black transition-all duration-100 ease-in-out rounded-md">
              <LayoutDashboard size={16} color="#000000" />
              Dashboard
            </div>
          </Link>
        </div>


        <div className="flex flex-col">
          <p className="text-gray-400 text-sm" >Job Board</p>
          <Link to="jobs"className="text-sm" draggable="false">
            <div className="flex items-center p-2 mb-0 gap-1 hover:bg-gray-100 hover:text-black transition-all duration-100 ease-in-out rounded-md">
              <Briefcase size={16} color="#000000" />
              Jobs
            </div>
          </Link>
          <Link to="interview"className="text-sm" draggable="false">
            <div className="flex items-center p-2 mb-0 gap-1 hover:bg-gray-100 hover:text-black transition-all duration-100 ease-in-out rounded-md">
              <MessagesSquare size={16} color="#000000" />
              Interview 
            </div>
          </Link>

          <Link to="saved-resume"className="text-sm" draggable="false">
            <div className="flex items-center p-2 mb-0 gap-1 hover:bg-gray-100 hover:text-black transition-all duration-100 ease-in-out rounded-md">
              <FileUser size={16} color="#000000" />
              Saved Resume
            </div>
          </Link>

          <Link to="survey-request"className="text-sm" draggable="false">
            <div className="flex items-center p-2 mb-0 gap-1 hover:bg-gray-100 hover:text-black transition-all duration-100 ease-in-out rounded-md">
              <Binoculars size={16} color="#000000" />
              Survey Request
            </div>
          </Link>
        </div>

        <div className="flex flex-col">
          <p className="text-gray-400 text-sm" >Tools</p>

          <Link to="events"className="text-sm" draggable="false">
            <div className="flex items-center p-2 mb-0 gap-1 hover:bg-gray-100 hover:text-black transition-all duration-100 ease-in-out rounded-md">
              <CalendarDays size={16} color="#000000" />
              Events
            </div>
          </Link>

          <Link to="report-an-exit"className="text-sm" draggable="false">
            <div className="flex items-center p-2 mb-0 gap-1 hover:bg-gray-100 hover:text-black transition-all duration-100 ease-in-out rounded-md">
              <Send size={16} color="#000000" />
              Report An Exit
            </div>
          </Link>

          <Link to="settings"className="text-sm" draggable="false">
            <div className="flex items-center p-2 mb-0 gap-1 hover:bg-gray-100 hover:text-black transition-all duration-100 ease-in-out rounded-md">
              <Settings size={16} color="#000000" />
              Settings
            </div>
          </Link>
        </div>

      </nav>
      <Link to="profile" draggable="false">
        <div className="pt-2 flex items-center gap-2 border-t border-gray-200 hover:bg-gray-100 hover:text-black transition-all duration-100 ease-in-out rounded-md">
          <img className="w-10 h-10 rounded-full overflow-hidden object-cover object-[50%_50%]" src="https://i.imgur.com/F9Nf9Fx.jpeg" />
          <div>
            <p>Shashwat</p>
          </div>
        </div>
      </Link>
    </aside>
  ) 
}