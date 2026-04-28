import { useContext, useState} from 'react'

//context
import { JobContext } from '../../App'

//helper function
import { formatLongDate, addingAmPm } from '../../utils/helperFunctions'

//assests
import locationPin from '../../assets/location-pin-alt-1-svgrepo-com.svg'
import calender from '../../assets/calendar-date-schedule-svgrepo-com.svg'

//components
import InterviewModal from './InterviewModal'

//api
import { deleteApplication } from '../../api/users'

export default function Interview(){

  
  const {applicationJson, setApplicationJson} = useContext(JobContext)
  console.log(applicationJson)

   /* Set to 0, so that html for the right side will not throw error */

  const [search, setSearch] = useState("");
  const [activeBtn, setActiveBtn] = useState("all")
  
  const [modalType, setModalType] = useState(null)

  const withInterview = applicationJson.filter(info=>info?.stage?.toLowerCase() === 'interview')
    .filter(info=>{
      if(search === ""){
        return true
      }else{
        return info.company.name.toLowerCase().includes(search.toLowerCase()) ||
          info.jobTitle.toLowerCase().includes(search.toLowerCase())
        
      }
    })

   const interviewOnPage = withInterview.filter((interview)=>{
      if(activeBtn==='all' && !interview.isDeleted)
        return true
      else if(!interview.isDeleted)
        return interview?.interviews?.[0]?.status?.toLowerCase() === activeBtn?.toLowerCase()
    }) || []



  const [selectedId, setSelectedId] = useState(interviewOnPage?.[0]?.id ?? null)

  console.log(selectedId)

  let selectedApplication
  if(selectedId>=0){
    selectedApplication = interviewOnPage.find(application=>application.id === selectedId)
  }

  
  const latestSelectedIdInterview = selectedApplication?.interviews?.[0]

  console.log("selectedId", selectedId)


  // console.log(interviewJson[selectedId]?.interviews)


  console.log("withInterview is", withInterview)
  console.log("interviewOnPage is", interviewOnPage)

  const selectedIdSortedInterview = selectedApplication?.interviews?.sort((a,b)=>b.round-a.round)

 


    let interviewLeftHtml

    if(interviewOnPage?.interviews?.length > 0){
      interviewLeftHtml = interviewOnPage.map((info, i)=>(
        <div 
          className='bg-white rounded-lg px-4 p-2 mb-2 border border-gray-100 hover:bg-gray-100' 
          key={i}
          onClick={()=>{setSelectedId(Number(info.id))}}
        >
          <div className='flex items-center m-2 border-b border-gray-300/30 pb-2'>
            <div className='' >
              <img className='w-10 h-10 mr-4' src={info.company.logoLink} alt="company logo" />
            </div>
            <div>
              <h3>{info.company.name}</h3>
              <p className='text-sm text-black/60'>{info.jobTitle}</p>
            </div>
          </div>
          <div className=' text-sm px-4 pb-2'>{formatLongDate(info.interviews[info.interviews.length-1].date)}</div>
        </div>
      ))
    }else{
      interviewLeftHtml = interviewOnPage.map((info, i)=>(
        <div 
          className='bg-white rounded-lg px-4 p-2 mb-2 border border-gray-100 hover:bg-gray-100' 
          key={i}
          onClick={()=>{setSelectedId(Number(info.id))}}
        >
          <div className='flex items-center m-2 border-b border-gray-300/30 pb-2'>
            <div className='' >
              <img className='w-10 h-10 mr-4' src={info.company.logoLink} alt="company logo" />
            </div>
            <div>
              <h3>{info.company.name}</h3>
              <p className='text-sm text-black/60'>{info.jobTitle}</p>
            </div>
          </div> 
        </div>
      ))

    }

    console.log("selectedIdSortedInterview is", selectedIdSortedInterview)


  const sortedRoundHtml = selectedIdSortedInterview?.map((round,i)=>{
    return (<div className='flex flex-col' key={i}>
      <h3>{round.type} Round</h3>
      <p>{formatLongDate(round.date)}, {addingAmPm(round.time.start)} 
        <span className='text-gray-400'> | {round.time.duration} mins</span>
      </p>
      <ul className="list-disc pl-5 mt-4">
        {round.details.split(".").map((detail,i)=>(detail.trim() ? <li key={i}>{`${detail}.`}</li> : null))}
      </ul>
      <p className='m-2'>
        <span className='font-semibold'>Notes: </span>
        {round.notes}
      </p>
    </div>)
  })

  console.log(applicationJson)




  return (
    
    <>
      {modalType && <InterviewModal modalType={modalType} setModalType={setModalType} applicationJson={applicationJson} setApplicationJson={setApplicationJson} selectedId={selectedId} setSelectedId={setSelectedId} selectedApplication={selectedApplication}/>}
      <main className='bg-gray-100 grow p-8 ml-60 flex flex-col min-h-0'>
        {/* {addJobModal && <AddJob setAddJobModal={setAddJobModal} openModalId = {openModalId} setOpenModalId={setOpenModalId}/>} */}
       
        <div className="w-full space-y-6 ">

        {/* Header */}
          <div className="flex justify-between items-center mb-8 ">
            <h1 className="text-2xl font-semibold text-gray-900">Interview</h1>
            <div className="flex items-center space-x-4">
              
              <button className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center bg-white hover:bg-gray-50">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
          <section className='flex bg-white p-4 rounded-lg justify-between shadow-sm'>
            <p className='ml-2'>Total Interview</p>
            <p className='mr-2'>{interviewOnPage.length>1 ? `${interviewOnPage.length} Interviews` : `${interviewOnPage.length} Interview`}</p>
          </section>
        </div>

        <div className='h-full flex gap-4 overflow-hidden'>
          <div className='flex flex-col h-full w-2/5 bg-gray-100 py-4 px-1 overflow-y-auto overflow-x-hidden'>
            <input className='bg-white w-full self-center px-6 py-3 rounded-lg ' 
               type="text" 
               placeholder="Search Interviews..."
               value={search}
               onChange={e=>setSearch(e.target.value)}
            />
            <h2 className='w-full bg-white mt-4 p-3 px-6 text-xl font-semibold rounded-lg'>Interviews</h2>
            <div className='p-2 bg-gray-50 shadow '>
              {interviewLeftHtml}
            </div>
            
          </div>
          
            <div className='flex flex-col bg-gray-100 h-full w-3/5 p-2 py-4 min-h-0'> {/* Right side of the Interview */}
              <div className='flex w-full items-center justify-between'>

                <div className='bg-gray-200 p-1 rounded-lg flex'>
                  <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                      activeBtn === 'all' 
                        ? 'bg-white shadow-sm' 
                        : null
                    }`} value="all" onClick={(e)=>setActiveBtn(e.currentTarget.value)}>All</button>

                  <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                      activeBtn === 'upcoming' 
                        ? 'bg-white shadow-sm' 
                        : null
                    }`} value="upcoming" onClick={(e)=>(setActiveBtn(e.currentTarget.value))}>Upcoming</button>

                  <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                      activeBtn === 'passed' 
                        ? 'bg-white shadow-sm' 
                        : null
                    }`} value="passed" onClick={(e)=>setActiveBtn(e.currentTarget.value)}>Passed</button>

                    <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 ${
                      activeBtn === 'failed' 
                        ? 'bg-white shadow-sm' 
                        : null
                    }`} value="failed" onClick={(e)=>setActiveBtn(e.currentTarget.value)}>Failed</button>
                </div>
                  {selectedId!==null && 
                <div className='flex w-full justify-end gap-2'>
                  <button className='bg-white border border-gray-300 px-4 py-1 rounded-sm hover:bg-gray-200 active:scale-95'
                    onClick={()=>(setModalType('add'))}
                    >Add</button>

                  {selectedIdSortedInterview?.length > 0 &&
                    <>
                      <button className='bg-white border border-gray-300 px-4 py-1 rounded-sm hover:bg-gray-200 active:scale-95'
                        onClick={()=>(setModalType('edit'))}
                      >Edit</button>
                      <button 
                        className='bg-red-100 text-red-600 hover:bg-red-100 border  border-gray-300 px-4 py-1 rounded-sm  active:scale-95'
                        onClick={async()=>{
                          await deleteApplication(selectedId)

                          setApplicationJson(prev=>prev.map(job =>
                          job.id === selectedId
                            ? { ...job, interviews:selectedIdSortedInterview.slice(1) }
                            : job
                        ))

                      }}
                      >Delete</button>
                    </>
                  }
                </div>}
              </div>

              {/* {selectedId && } */}
              {latestSelectedIdInterview && !selectedApplication.isDeleted &&
              <>
                <div className='bg-white p-3 border-b border-gray-200 rounded-t-lg mt-4' >
                  Interview {'> ' + selectedApplication.company.name}  Interview
                </div>
                <div 
                  className='bg-white px-4 p-2 border border-gray-100  border-b'  
                >
                  <div className='flex items-center m-2 pb-2 '>
                    <div className='' >
                      <img className='w-10 h-10 mr-4' src={selectedApplication.company.logoLink} alt="company logo" />
                    </div>
                    <div>
                      <h3>{selectedApplication.company.name}</h3>
                      <p className='text-sm text-black/60'>{selectedApplication.jobTitle}</p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center border-b border-gray-200 bg-white h-15'>{/* Interview type time of the lastest interview */}
                  <div className='flex w-1/2 m-3 h-10 border-r pl-2 items-center border-gray-200'>
                    <img src={locationPin} alt="location pin" className='w-6 mr-2'/>
                     Interview
                  </div>
                  <div className='flex items-center w-1/2'>
                    <img src={calender} alt="calender" className='w-6'/>
                    <div className=' text-sm px-4'>{formatLongDate(latestSelectedIdInterview.date)} at {addingAmPm(latestSelectedIdInterview.time.start)}</div>

                  </div>
                </div>
                <div className='bg-white px-6 py-4 font-semibold border-b border-gray-200'>Interview Process</div>

                <div className='p-6 flex flex-1 shrink flex-col gap-8 bg-white border-b border-gray-200 overflow-x-auto'> {/* add h-100 to this */}
                  {sortedRoundHtml}
                </div>
                <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-linear-to-l from-white to-transparent"></div>
              </>}
            </div>
            
            
          </div>
        </main>
    </>
  )
}