import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

//Icons
import { Bell, ChevronsRightLeft } from 'lucide-react';

//helper function

//contexts
import { JobContext } from '../../App'

//component
import AddJob from './AddJob'
import Interview from './Interview'
import Dropdown from './Dropdown' 


export default function Jobs(){

  const [activeBtn, setActiveBtn] = useState('all')
  const [activePage, setActivePage] = useState(1)
  const [searchParam, setSearchParam] = useState('')


  const {interviewJson, setInterviewJson} = useContext(JobContext)


  // console.log( "In Jobs.jsx", interviewJson[20])
  // console.log("Jobs re-rendered")

  const [addJobModal, setAddJobModal] = useState(false)
  const [openModalId, setOpenModalId] = useState(null)


  // useEffect(()=>{
  //   setInterviewJson([])
  // },[])


  function handleClick(e){
    setActivePage(1)
    setActiveBtn(e.currentTarget.value)
  }

  const checkBox = <input className='appearance-none size-5 border border-gray-300 rounded mr-3 checked:bg-gray-400 checked:border-transparent' type="checkbox" name="delete-all-checkbox" />
  
  let filteredList = []
  

  //Filtering on the basis of stage
  if(interviewJson.length>0){
     filteredList = interviewJson
    .filter((interview)=>{
      if(activeBtn==='all' && !interview.deleted)
        return true
      else if(!interview.deleted)
        return interview.stage.toLowerCase() === activeBtn.toLowerCase()
    }).filter(info=>{
      if(!searchParam){
        return true
      }else{
        const searchFields = [
          info.company.name,
          info.company.location,
          info.jobTitle,
          info.interviewType,
          info.date,
          info.stage
        ]
        const normalize = (str) => str?.toLowerCase().replace(/[\s-_]/g, "")
    
    return searchFields.some(field => 
      normalize(field).includes(normalize(searchParam))
    )
      }
    })
  }
  
  const filteredListLen = filteredList.length
    
    
    
    const itemsPerPage = 10;
    const startIndex = (activePage - 1) * itemsPerPage;
    const lastIndex = activePage * itemsPerPage;
    
    //Debugging
    // console.log("filteredListLen", filteredListLen)
    // console.log("startIndex", startIndex)
    // console.log("lastIndex", lastIndex)
    // console.log("activePage", activePage)

    let interviewHtml = ''
  
    //Making Html of the interview detail
    if(filteredListLen>0){
      interviewHtml = filteredList.slice(startIndex, lastIndex).map((interview, i)=>(
        <div className={`grid relative grid-cols-[auto_2fr_3fr_1.8fr_1fr_1fr] items-center bg-white mx-6 h-15 shadow-sm p-3 box-border w-[calc(100%-3rem)]`} key={i}>
    
          {checkBox}

          {/* Company Name */}
          <div className='flex ' >
            <div className='w-8 h-8 flex items-center justify-center rounded-full shadow-md shadow-gray-600/30'>
              <img src={interview.company.logoLink} className='w-6' alt={`${interview.company.name} logo`}/>
            </div>

            <div className='ml-2'>
              <p className='text-xs'>{interview.company.name}</p>
              <p className='text-xs text-gray-400'>{interview.company.location}</p>
            </div>
          </div>

          {/* Job Title */}   
          <div className=''>
            {interview.jobTitle}
          </div>
          {/* Salary */}
          <div className=''>
            {`₹${interview.salaryRange.min} - ₹${interview.salaryRange.max}`}
          </div>
          {/* Interview Data */}
          <div className=''>
            {interview.date}
          </div>
          {/* Interview Type */}
          {/* <div className=''>
            {interview.interviewType}
          </div> */}
          {/* Stage */}
          <div className=''>
            {interview.stage}
          </div>
          <button 
            className="absolute right-5 text-xl px-2 py-1 hover:bg-gray-200 rounded"
            onClick={()=>{setOpenModalId(interview.id)}}
          >
            &#8942;
          </button>


          {/* {openModalId === interview.id && (
            <div className="absolute right-0 top-10 overflow-visible mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Edit
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Delete
              </button>
            </div>
            )
          } */}

          <Dropdown openModalId={openModalId} setOpenModalId={setOpenModalId} id={interview.id} setAddJobModal={setAddJobModal}/>
        </div>
      ))
    }


  return (
    <>
      <main className='bg-gray-100 grow'>
        {addJobModal && <AddJob setAddJobModal={setAddJobModal} openModalId = {openModalId} setOpenModalId={setOpenModalId}/>}
        <section className="flex items-center h-16 w-full justify-between border border-gray-200 p-4 bg-white shadow-xs">
          <h2>Applied Jobs</h2>
          <div className='flex items-center gap-x-4'>
            <input 
              className='border border-gray-300 px-4 py-1 rounded-md' type="text" name="search" id="search" placeholder="Search"
              onChange={(e)=>{setSearchParam(e.currentTarget.value)}} 
            />
            <Bell size={16} />
          </div>
        </section>

        <section className='flex m-6 bg-white p-4 rounded-lg justify-between shadow-sm'>
          <p className='ml-2'>Jobs You have Applied</p>
          <p className='mr-2'>{filteredListLen} Jobs</p>
        </section>

        <section >
            <div className='flex flex-row m-6 mb-0 bg-white p-4 rounded-t-lg items-baseline justify-between' >
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
                    activeBtn === 'shortlisted' 
                      ? 'bg-white shadow-sm' 
                      : null
                  }`} value="shortlisted" onClick={handleClick}>Shortlist</button>
                <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                    activeBtn === 'rejected' 
                      ? 'bg-white shadow-sm' 
                      : null
                  }`} value="rejected" onClick={handleClick}>Rejected</button>
              </div>
              <button
                className='px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition'
                onClick={()=>{setAddJobModal(true)}}
              >Add More</button>
            </div>
          <div className='grid grid-cols-[auto_2fr_3fr_1.8fr_1fr_1fr] items-center bg-gray-100 mx-6 shadow-sm p-3 box-border w-[calc(100%-3rem)]'>
            {checkBox}
            
            <p className='text-sm text-gray-500'>Company Name</p>
            <p className='text-sm text-gray-500'>Job Title</p>
            <p className='text-sm text-gray-500'>Salary Range</p>
            <p className='text-sm text-gray-500'>Last Updated On</p>
            {/* <p className='text-sm text-gray-500'>Interview Type</p> */}
            <p className='text-sm text-gray-500'>Stage</p>
          </div>
            
            {/* This below is main div */}
            {interviewHtml}
            {filteredListLen>10 && 
            <div className='flex justify-between items-center bg-white mx-6 h-15 shadow-sm p-3 box-border w-[calc(100%-3rem)]'>
              <button className='bg-white 
                border border-gray-200 
                px-3 py-2 
                rounded-lg 
                flex gap-x-1 
                transition-all duration-150

                hover:bg-gray-100 hover:border-gray-300

                active:scale-95 active:bg-gray-800 active:text-white

                disabled:bg-gray-200 
                disabled:text-gray-500 
                disabled:cursor-not-allowed'
                onClick={()=>{if(activePage>1){
                  setActivePage(prev=>prev-1)
                }}}
                disabled={activePage===1 ? true : false} 
              >&larr; Previous</button>
              <button className='bg-white 
                border border-gray-200 
                px-3 py-2 
                rounded-lg 
                flex gap-x-1 
                transition-all duration-150

                hover:bg-gray-100 hover:border-gray-300

                active:scale-95 active:bg-gray-800 active:text-white

                disabled:bg-gray-200 
                disabled:text-gray-500 
                disabled:cursor-not-allowed' 
                onClick={()=>{if(activePage < Math.ceil(filteredListLen/10)){
                  setActivePage(prev=>prev+1)
                }}}
                disabled={activePage===Math.ceil(filteredListLen/10) ? true : false} 
              >Next &rarr;</button>
            </div>}
            

        </section>
        

      </main>



    </>
  )
}