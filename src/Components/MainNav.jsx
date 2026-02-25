import React from "react";
import { Link } from 'react-router-dom'

import { LayoutDashboard, Briefcase, MessagesSquare, Binoculars, FileUser, CalendarDays, Send, Settings} from 'lucide-react';


export default function MainNav(){
  return (
    <aside className="flex flex-col p-6 bg-white h-screen w-60 border-r border-gray-200 ">
      <div className="flex py-4 border-b border-gray-200">
        <h1 className="text-2xl">Interview</h1>
        <button>-</button>
      </div>

      <nav className="flex flex-col gap-4 py-4 grow">
        <div>
          <p className="text-gray-400 text-sm">Main</p>
          <div className="flex items-center m-2 mb-0 gap-1">
            <LayoutDashboard size={16} color="#000000" />
            <Link to="dashboard"className="text-sm">Dashboard</Link>
          </div>
        </div>


        <div className="flex flex-col">
          <p className="text-gray-400 text-sm" >Job Board</p>
          <div className="flex items-center m-2 mb-0 gap-1">
            <Briefcase size={16} color="#000000" />
            <Link to="job"className="text-sm">Jobs</Link>
          </div>

          <div className="flex items-center m-2 mb-0 gap-1">
            <MessagesSquare size={16} color="#000000" />
            <Link to="interview"className="text-sm">Interview</Link>
          </div>

          <div className="flex items-center m-2 mb-0 gap-1">
            <FileUser size={16} color="#000000" />
            <Link to="saved-resume"className="text-sm">Saved Resume</Link>
          </div>

          <div className="flex items-center m-2 mb-0 gap-1">
            <Binoculars size={16} color="#000000" />
            <Link to="survey-request"className="text-sm">Survey Request</Link>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-gray-400 text-sm" >Tools</p>
          <div className="flex items-center m-2 mb-0 gap-1">
            <CalendarDays size={16} color="#000000" />
            <Link to="events"className="text-sm">Events</Link>
          </div>

          <div className="flex items-center m-2 mb-0 gap-1">
            <Send size={16} color="#000000" />
            <Link to="report-an-exit"className="text-sm">Report An Exit</Link>
          </div>

          <div className="flex items-center m-2 mb-0 gap-1">
            <Settings size={16} color="#000000" />
            <Link to="settings"className="text-sm">Settings</Link>
          </div>

        </div>

      </nav>

      <div className="py-2 flex items-center gap-2 border-t border-gray-200 bg-white">
        <img className="w-10 h-10 rounded-full overflow-hidden object-cover object-[50%_50%]" src="https://i.imgur.com/F9Nf9Fx.jpeg" />
        <div>
          <p>Jayawan</p>
          <p className="text-gray-400 text-sm">Email</p>

          
        </div>
      </div>
    </aside>
  ) 
}