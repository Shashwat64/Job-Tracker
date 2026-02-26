import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Bell } from 'lucide-react';

export default function Jobs(){

  const [activeBtn, setActiveBtn] = useState('all')

  function handleClick(e){
    setActiveBtn(e.currentTarget.value)
  }
  


  return (
    <>
      <main className='bg-gray-100 grow'>
        <section className="flex items-center h-16 w-full justify-between border border-gray-200 p-4 bg-white">
          <h2>Applied Jobs</h2>
          <div className='flex items-center gap-x-4'>
            <input className='border border-gray-300 px-4 py-1 rounded-md' type="text" name="search" id="search" placeholder="Search" />
            <Bell size={16} />
          </div>
        </section>

        <section className='flex m-6 bg-white p-4 rounded-lg justify-between'>
          <p className='ml-2'>Jobs You have Applied</p>
          <p className='mr-2'>0 Jobs applied</p>
        </section>

        <section className='flex m-6 bg-white p-4 rounded-lg'>
          <div>
            <div className='bg-gray-100 p-1 rounded-lg flex gap-x-1'>
              <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                  activeBtn === 'all' 
                    ? 'bg-white border border-gray-300' 
                    : null
                }`} value="all" onClick={handleClick}>All</button>
              <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                  activeBtn === 'pending' 
                    ? 'bg-white border border-gray-300' 
                    : null
                }`} value="pending" onClick={handleClick}>Pending</button>
              <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                  activeBtn === 'shortlist' 
                    ? 'bg-white border border-gray-300' 
                    : null
                }`} value="shortlist" onClick={handleClick}>Shortlist</button>
              <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                  activeBtn === 'rejected' 
                    ? 'bg-white border border-gray-300' 
                    : null
                }`} value="rejected" onClick={handleClick}>Rejected</button>
            </div>
          </div>
        </section>

      </main>



    </>
  )
}