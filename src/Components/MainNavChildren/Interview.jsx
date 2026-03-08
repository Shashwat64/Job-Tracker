import { Link } from 'react-router-dom'
import { useContext, useState} from 'react'

//context
import { JobContext } from '../../App'

//helper function
import { formatLongDate, addingAmPm } from '../../utils/helperFunctions'

//assests
import locationPin from '../../assets/location-pin-alt-1-svgrepo-com.svg'
import calender from '../../assets/calendar-date-schedule-svgrepo-com.svg'

//components
import ModalType from './ModalType'


export default function Interview(){

  const {interviewJson, setInterviewJson} = useContext(JobContext)

  const [selectedId, setSelectedId] = useState(0) /* Set to 0, so that html for the right side will not throw error */
  
  const [modaltype, setModalType] = useState(null)
  
  const latestSelectedIdInterview = interviewJson[selectedId].interviews[interviewJson[selectedId].interviews.length-1]

  const withInterview = interviewJson.filter(info=>info.interviews?.length)

  const selectedIdSortedInterview = interviewJson[selectedId].interviews.sort((a,b)=>b.round-a.round)

  const interviewLeftHtml = withInterview.map((info, i)=>(!info.isDeleted &&
    <div 
      className='bg-white rounded-lg px-4 p-2 mb-2 border border-gray-100 hover:bg-gray-100' 
      key={i}
      onClick={()=>{setSelectedId(info.id)}}
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

  const sortedRoundHtml = selectedIdSortedInterview.map((round,i)=>{
    return (<div className='mb-4' key={i}>
      <h3>{round.type} Round</h3>
      <p>{formatLongDate(round.date)}, {addingAmPm(round.time.start)} 
        <span className='text-gray-400'> | {round.time.duration} mins</span>
      </p>
      <ul className="list-disc pl-5 mt-4">
        {round.details.split(".").map((detail,i)=>(detail.trim() ? <li key={i}>{`${detail}.`}</li> : null))}
      </ul>
    </div>)
  })

  // console.log(interviewJson)




  return (
    <>
      {modaltype && <ModalType modaltype={modaltype} setModalType={setModalType} interviewJson={interviewJson} setInterviewJson={setInterviewJson} selectedId={selectedId} setSelectedId={setSelectedId}/>}
      <main className='bg-gray-100 grow p-8 ml-60 h-screen overflow-hidden'>
        {/* {addJobModal && <AddJob setAddJobModal={setAddJobModal} openModalId = {openModalId} setOpenModalId={setOpenModalId}/>} */}
       
        <div className="w-full space-y-6 ">

        {/* Header */}
          <div className="flex justify-between items-center mb-8 ">
            <h1 className="text-2xl font-semibold text-gray-900">Interview</h1>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md px-4 py-2 text-sm w-64 bg-white outline-none focus:border-gray-400"
              />
              <button className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center bg-white hover:bg-gray-50">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
          <section className='flex bg-white p-4 rounded-lg justify-between shadow-sm'>
            <p className='ml-2'>Total Interview</p>
            <p className='mr-2'>Interview</p>
          </section>
        </div>

        <div className='h-full flex gap-4 overflow-hidden'>
          <div className='h-full w-2/5 bg-gray-100 py-4 overflow-y-auto'>
            <input className='bg-white w-full px-6 py-3 rounded-lg' 
               type="text" 
               placeholder="Search Interviews..."
            />
            <h2 className='w-full bg-white mt-4 p-3 px-6 text-xl font-semibold rounded-lg'>Interviews</h2>
            <div className='p-2 bg-gray-50  shadow'>
              {interviewLeftHtml}
            </div>
            
          </div>
          {!interviewJson[selectedId].isDeleted &&
            <div className='flex flex-col bg-gray-100 h-full w-3/5 p-4 overflow-y-auto'> {/* Right side of the Interview */}
              <div className='flex w-full items-start justify-end gap-2 mb-4'>
                <button className='bg-white border border-gray-300 px-4 py-1 rounded-sm hover:bg-gray-200 active:scale-95'
                  onClick={()=>(setModalType('add'))}
                  >Add</button>
                <button className='bg-white border border-gray-300 px-4 py-1 rounded-sm hover:bg-gray-200 active:scale-95'
                  onClick={()=>(setModalType('edit'))}
                >Edit</button>
                <button 
                  className='bg-red-100 text-red-600 hover:bg-red-100 border  border-gray-300 px-4 py-1 rounded-sm  active:scale-95'
                  onClick={()=>{setInterviewJson(prev=>prev.map(job =>
                    job.id === selectedId
                      ? { ...job, isDeleted: true }
                      : job
                  ))}}
                >Delete</button>
              </div>

              {/* {selectedId && } */}

              <div className='bg-white p-3 border-b border-gray-200 rounded-t-lg' >
                Interview {'> ' + interviewJson[selectedId].company.name}  Interview
              </div>
              <div 
                className='bg-white px-4 p-2 border border-gray-100  border-b'  
              >
                <div className='flex items-center m-2 pb-2 '>
                  <div className='' >
                    <img className='w-10 h-10 mr-4' src={interviewJson[selectedId].company.logoLink} alt="company logo" />
                  </div>
                  <div>
                    <h3>{interviewJson[selectedId].company.name}</h3>
                    <p className='text-sm text-black/60'>{interviewJson[selectedId].jobTitle}</p>
                  </div>
                </div>
              </div>
              <div className='flex items-center border-b border-gray-200 bg-white h-15'>{/* Interview type time of the lastest interview */}
                <div className='flex w-1/2 m-3 h-10 border-r pl-2 items-center border-gray-200'>
                  <img src={locationPin} alt="location pin" className='w-6 mr-2'/>
                  {interviewJson[selectedId].interviewType} Interview
                </div>
                <div className='flex items-center w-1/2'>
                  <img src={calender} alt="calender" className='w-6'/>
                  <div className=' text-sm px-4'>{formatLongDate(latestSelectedIdInterview.date)} at {addingAmPm(latestSelectedIdInterview.time.start)}</div>

                </div>
              </div>
              <div className='bg-white px-6 py-4 font-semibold border-b border-gray-200'>Interview Process</div>
              <div className='px-6 py-4 bg-white border-b border-gray-200'>
                {sortedRoundHtml}
              </div>
            </div>}
        </div>
        </main>
    </>
  )
}