import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Bell } from 'lucide-react';

import appleLogo from '../../assets/appleLogo.png'

export default function Jobs(){

  const [activeBtn, setActiveBtn] = useState('all')

  function handleClick(e){
    setActiveBtn(e.currentTarget.value)
  }

  const checkBox = <input className='appearance-none size-5 border border-gray-300 rounded mr-3 checked:bg-gray-400 checked:border-transparent' type="checkbox" name="delete-all-checkbox" />
  


  return (
    <>
      <main className='bg-gray-100 grow'>
        <section className="flex items-center h-16 w-full justify-between border border-gray-200 p-4 bg-white shadow-xs">
          <h2>Applied Jobs</h2>
          <div className='flex items-center gap-x-4'>
            <input className='border border-gray-300 px-4 py-1 rounded-md' type="text" name="search" id="search" placeholder="Search" />
            <Bell size={16} />
          </div>
        </section>

        <section className='flex m-6 bg-white p-4 rounded-lg justify-between shadow-sm'>
          <p className='ml-2'>Jobs You have Applied</p>
          <p className='mr-2'>0 Jobs applied</p>
        </section>

        <section >
          <div className='flex flex-col m-6 mb-0 bg-white p-4 rounded-t-lg items-baseline'>
            <div className='bg-gray-100 p-1 rounded-lg flex gap-x-1'>
              <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                  activeBtn === 'all' 
                    ? 'bg-white shadow-sm' 
                    : null
                }`} value="all" onClick={handleClick}>All</button>
              <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                  activeBtn === 'pending' 
                    ? 'bg-white shadow-sm' 
                    : null
                }`} value="pending" onClick={handleClick}>Pending</button>
              <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                  activeBtn === 'shortlist' 
                    ? 'bg-white shadow-sm' 
                    : null
                }`} value="shortlist" onClick={handleClick}>Shortlist</button>
              <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                  activeBtn === 'rejected' 
                    ? 'bg-white shadow-sm' 
                    : null
                }`} value="rejected" onClick={handleClick}>Rejected</button>
            </div>
          </div>
          <div className='grid grid-cols-[auto_2fr_3fr_1fr_1fr_1fr_1fr] items-center bg-gray-100 mx-6 shadow-sm p-3 box-border w-[calc(100%-3rem)]'>
            {checkBox}
            
            <p className='text-sm text-gray-500'>Company Name</p>
            <p className='text-sm text-gray-500'>Job Title</p>
            <p className='text-sm text-gray-500'>Salary Range</p>
            <p className='text-sm text-gray-500'>Interview Date</p>
            <p className='text-sm text-gray-500'>Interview Type</p>
            <p className='text-sm text-gray-500'>Stage</p>
          </div>
            
            {/* This below is main div */}
          <div className='grid grid-cols-[auto_2fr_3fr_1fr_1fr_1fr_1fr] items-center bg-white mx-6 h-15 shadow-sm p-3 box-border w-[calc(100%-3rem)]'>

            {checkBox}

            {/* Company Name */}
            <div className='flex  bg-amber-200'>
              <div className='w-8 h-8 flex items-center justify-center rounded-full shadow-md shadow-gray-600/30'>
                <img src={appleLogo} className='w-5'/>
              </div>

              <div className='ml-2'>
                <p className='text-xs'>Apple</p>
                <p className='text-xs text-gray-400'>Location</p>
              </div>
            </div>

            {/* Job Title */}   
            <div className='bg-red-300'>
              Central Paradigm Engineer
            </div>
            {/* Salary */}
            <div className='bg-yellow-300'>
              $3000-$4000
            </div>
            {/* Interview Data */}
            <div className='bg-yellow-300'>
              10 Mar 2025
            </div>
            {/* Interview Type */}
            <div className='bg-yellow-300'>
              Virtual
            </div>
            {/* Stage */}
            <div className='bg-yellow-300'>
              Pending
            </div>
          </div>

        </section>
        

      </main>



    </>
  )
}