import { useState } from "react"
import { capitalise } from "../../utils/helperFunctions"

export default function ModalType({ modaltype, setModalType, interviewJson, setInterviewJson, selectedId }){
  
  const jobAtInterviewStage = interviewJson.filter(interview=>interview.stage.toLowerCase() === "interview")

  console.log(jobAtInterviewStage)

  const [selectedJob, setSelectedJob] = useState("")
  
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={() => setModalType(null)}
    >
      <div 
        className="min-w-100 min-h-150 w-1/3 h-2/3 bg-white rounded-xl shadow-xl p-6 relative "
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div 
          className="absolute flex top-8 left-6 w-7 h-7  justify-center items-center rounded-full hover:bg-gray-200"
        >
          <button className="text-xl leading-none" onClick={()=>(setModalType(null))}>&times;</button>
        </div>

        <div className=" flex flex-col justify-center items-center w-full h-full p-8 gap-4">
          <p>{capitalise(modaltype)} Interview</p>
          <div>
            <form onSubmit="">
              <select name="" id="">
                {jobAtInterviewStage.map(interview=>(
                  <option value={interview.id}>{interview.company.name} - {interview.jobTitle}</option>
                ))}
              </select>
            </form>
          </div>
        </div>



      </div>
    </div>
  )
}

/* for edit page
  <select name="" id="">
    <option value="pending">Pending</option>
    <option value="shortlisted">Shortlisted</option>
    <option value="rejected">Rejected</option>
  </select>
*/