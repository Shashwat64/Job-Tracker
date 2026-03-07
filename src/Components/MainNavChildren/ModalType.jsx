import { useEffect, useState } from "react"
import { capitalise } from "../../utils/helperFunctions"

export default function ModalType({ modaltype, setModalType, interviewJson, setInterviewJson, selectedId,setSelectedId }){
  
  const jobAtInterviewStage = interviewJson.filter(interview=>interview.stage.toLowerCase() === "interview")

  console.log(jobAtInterviewStage)

  const [selectedJob, setSelectedJob] = useState("")

  const nextRound = interviewJson[selectedId].interviews[0].round+1

  const [editRound, setEditRound] = useState(null)

  const[selectedRound, setSelectedRound] = useState(interviewJson[selectedId].interviews[0].round)

  function handleChange(e){
    const {name, value} = e.currentTarget

    // if(name.includes('company.')){
    //   const key = name.split('.')[1]
    //   setNewJob(prev=>({
    //     ...prev,
    //     company:{...prev.company, [key]:value}
    //   }))
    // }else if(name.includes('salaryRange.')){
    //   const key = name.split('.')[1]
    //   setNewJob(prev=>({
    //     ...prev,
    //     salaryRange:{...prev.salaryRange, [key]: Number(value)}
    //   }))
    // }else{
    //   setNewJob((prev) => ({ ...prev, [name]: value }))
    // }
  }

  function handleSubmit(e){
    e.preventDefault()
    // const formData = e.currentTarget
    
    // if (newJob.salaryRange.max < newJob.salaryRange.min) {
    //   alert("Max salary must be greater than min salary");
    //   return;
    // }
    
    // let cleanUrl = newJob.company.url
    // if (cleanUrl.includes("https://")) {
    //   cleanUrl = newJob.company.url.split('/')[2]
    // }
    
    // setAddJobModal(false)
    // if(!editId){
    //   setInterviewJson(prev=>([
    //     ...prev,
    //     {...newJob, company:{...newJob.company, logoLink:`https://img.logo.dev/${cleanUrl}?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&retina=true`}}
    //   ]))
    // }else{
    //   setInterviewJson(prev=>([
    //     ...prev.slice(0,editId),
    //     {...newJob, company:{...newJob.company, logoLink:`https://img.logo.dev/${cleanUrl}?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&retina=true`}},
    //     ...prev.slice(editId+1)
    //   ]))
    // }
  }

  // const [selectedInterview, setSelectedInterview] = useState({
  //   round: nextRound,
  //   type: "",
  //   date: "",
  //   time:{
  //     start: '',
  //     duration: null
  //   },
  //   details:[],
  //   interviewer: "",
  //   meetingLink: "",
  //   notes: "",
  //   outcome: null,
  //   status: ""
  // })

  console.log(selectedId)

  const [selectedInterview, setSelectedInterview] = useState({
    round: nextRound,
    type: "",
    date: "",
    time:{
      start: '',
      duration: null
    },
    details:[],
    interviewer: "",
    meetingLink: "",
    notes: "",
    outcome: null,
    status: ""
  })

  useEffect(()=>{
    if(modaltype === "edit"){

      console.log(selectedInterview)
      setSelectedInterview(interviewJson[selectedId].interviews.find(
        round => round.round === Number(selectedRound)
      ))
    }
  },[selectedId, selectedRound])

console.log("selectedId:", selectedId)
console.log("selectedRound:", selectedRound)
console.log("interviews:", interviewJson[selectedId]?.interviews)


  // if(modaltype === "add"){
  //   selectedInterview = {
  //     round: nextRound,
  //     type: "",
  //     date: "",
  //     time:{
  //       start: '',
  //       duration: null
  //     },
  //     details:[],
  //     interviewer: "",
  //     meetingLink: "",
  //     notes: "",
  //     outcome: null,
  //     status: ""
  //     }
  // }else{
  //   selectedInterview = interviewJson[selectedId].interviews[0]
  //   console.log(interviewJson[selectedId])
  // }
  
  console.log(interviewJson[selectedId].interviews)
  console.log(selectedInterview)
  
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
              <select name="addInterview" id=""
                value={selectedId}
                onChange={(e) => {
                  setSelectedRound(interviewJson[e.target.value].interviews[0].round)
                  setSelectedId(e.target.value)
                }}
              >
                {jobAtInterviewStage.map(interview=>(
                  <option value={interview.id}>{interview.company.name} - {interview.jobTitle}</option>
                ))}
              </select>

              {modaltype==='edit'
                ? 
                  <select name="" id="" 
                    value={
                      interviewJson[selectedId].interviews.find(
                        round => round.round === Number(selectedRound)
                      ).round
                    }
                    onChange={(e) => {
                      console.log(e.target.value)
                      return setSelectedRound(e.target.value)
                    }}
                  >
                    {interviewJson[selectedId].interviews.map(round=>(
                      <option value={round.round}>{`Round ${round.round}`}</option>

                    ))}
                  </select>
                : <p>Round {nextRound}</p>}
               
              
              <input
                name="type"
                value={selectedInterview.type}
                onChange={handleChange}
                placeholder="type"
                className="w-full border p-2 rounded mb-2"
                required
              />

              {/* Date */}
              <input
                name="date"
                value={selectedInterview.date}
                onChange={handleChange}
                type="date"
                className="w-full border p-2 rounded mb-2"
                required
              />

              {/* Time and duration */}
              <div className="flex gap-2 mb-2">
                <input
                  name="time.start"
                  value={selectedInterview.time.start}
                  onChange={handleChange}
                  placeholder="Start Time"
                  type="text"
                  className="w-1/2 border p-2 rounded"
                  required
                />
                <input
                  name="time.duration"
                  value={selectedInterview.time.duration}
                  onChange={handleChange}
                  placeholder="Duration in minutes"
                  type="number"
                  className="w-1/2 border p-2 rounded"
                  required
                />
              </div>

                {/* details, this will be sentences, I have to split it by '.' */}
              <input
                name="details"
                value={selectedInterview.details}
                onChange={handleChange}
                placeholder="Details"
                className="w-full border p-2 rounded mb-2"
                required
              />
              <input
                name="company.interviewer"
                value={selectedInterview.interviewer}
                onChange={handleChange}
                placeholder="Interviewer Details"
                className="w-full border p-2 rounded mb-2"
                required
              />

              <input
                name="company.meetingLink"
                value={selectedInterview.meetingLink}
                onChange={handleChange}
                placeholder="Meeting Link"
                className="w-full border p-2 rounded mb-2"
                type="text"
              />


              <input
                name="notes"
                value={selectedInterview.notes}
                onChange={handleChange}
                placeholder="notes"
                className="w-full border p-2 rounded mb-2"
                required
              />

              <input
                name="outcome"
                value={selectedInterview.outcome}
                onChange={handleChange}
                placeholder="Outcome"
                className="w-full border p-2 rounded mb-2"
              />

              

              <button
                type='submit'
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {modaltype=="edit" ? "Edit" : "Add"} Job
              </button>

              <button
                onClick={()=>{
                  setSelectedInterview({
                    round: nextRound,
                    type: "",
                    date: "",
                    time:{
                      start: '',
                      duration: null
                    },
                    details:[],
                    interviewer: "",
                    meetingLink: "",
                    notes: "",
                    outcome: null,
                    status: ""
                  })
              }}
                className="bg-gray-400 text-white px-4 py-2 ml-4 rounded hover:bg-gray-600"
                type='button'
              >
                Reset
              </button>


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