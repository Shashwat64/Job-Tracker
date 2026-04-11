import { useEffect, useState } from "react"
import { capitalise } from "../../utils/helperFunctions"

//api function
import { addInterview, updateInterview} from "../../api/users"

export default function ModalType({ modaltype, setModalType, applicationJson,  setApplicationJson, selectedId,setSelectedId, selectedApplication }){
  
  const jobWithInterviews = applicationJson.filter(interview=>interview?.interviews?.length || interview.stage.toLowerCase() === 'interview')

  // useEffect(() => {
  //   setModalSelectedId(selectedId)
  // }, [selectedId])
  console.log(modaltype)

  
  const nextRound =
  Math.max(
    ...(selectedApplication?.interviews?.map(i => i.round) || []),
    0
  ) + 1;



  console.log(selectedApplication?.interviews?.[0]?.round+1)
  console.log(nextRound)


  const[selectedRound, setSelectedRound] = useState(nextRound-1)

  async function handleChange(e){
    const {name, value} = e.currentTarget

    // console.log("Inside handleChange "+name, value)

    if(name.includes('time.')){
      const key = name.split('.')[1]
      setNewRound(prev=>({
        ...prev,
        time:{...prev.time, [key]:Number(value)||value}
      }))
    }else{
      setNewRound((prev) => ({ ...prev, [name]: value }))
    }
  }

  async function handleSubmit(e){
    e.preventDefault()

    console.log("data of new round is sent")
    // console.log(await updateInterviews(newRound))
    
    if (modaltype === 'add') {

      const res = await addInterview(newRound, selectedId)
      console.log(res)

      setApplicationJson(prev => {
        console.log(typeof selectedId)
        // Check if the ID actually exists in our data first
        const exists = prev.some(info => info.id === Number(selectedId));
        
        if (!exists) {
          console.error("Cannot add round: Selected ID not found");
          return prev; 
        }

        return prev.map(info => (
          info.id === (selectedId)
            ? {
                ...info,
                interviews: [newRound, ...(info.interviews ?? [])]
              }
            : info
        ))

      });
    }else if(modaltype==='edit'){
     
      const res = await updateInterview(newRound)
      console.log(res)

      setApplicationJson(prev=>(
        prev.map(info=>(
          info.id===(selectedId) ? 
          {...info,
            interviews:info.interviews.map((round, i)=>(
              round.round === Number(selectedRound) ? {...info.interviews[i], ...newRound} : round))
          }
          : info
        ))
      ))
    }
    setModalType(null)
  }


  console.log(selectedRound)

  const [newRound, setNewRound] = useState({
    round: nextRound,
    type: "",
    mode: "virtual",
    date: "",
    time:{
      start: '',
      duration: ""
    },
    details:"",
    interviewer: "",
    meetingLink: "",
    notes: "",
    status: "upcoming"
  })

  useEffect(()=>{
    if(modaltype === "edit" ){

      // console.log(newRound)
      setNewRound(selectedApplication.interviews.find(
        round => round.round === selectedRound
      ))
    }
  },[selectedId, selectedRound])

  console.log("selectedId is", selectedId)
  console.log("nextRound is", nextRound)
  console.log("selectedRound is", selectedRound)
  console.log("newRound is", newRound)


  
  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto bg-black/40"
      onClick={() => setModalType(null)}
    >
      <div 
        className="min-w-100 min-h-150 w-1/2 h-2/3 bg-white rounded-xl shadow-xl p-6 relative overflow-y-auto"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div 
          className="absolute flex top-8 left-6 w-7 h-7 justify-center items-center rounded-full hover:bg-gray-200"
        >
          <button className="text-xl leading-none" onClick={()=>(setModalType(null))}>&times;</button>
        </div>

        <div className=" flex flex-col justify-start items-center w-full h-full p-8 gap-4 overflow-auto">
          <p>{capitalise(modaltype)} Interview</p>
          <div>
            <form onSubmit={handleSubmit} className="overflow-auto">
              <select name="addInterview" id=""
                value={selectedId}
                onChange={(e) => {
                  const round = applicationJson[e.target.value]?.interviews?.[0]?.round;
                  if (round !== undefined) {
                    setSelectedRound(Number(round));
                  }
                  setSelectedId(Number(e.target.value))
                }}
              >
                {jobWithInterviews.filter(interview=>{
                  if(modaltype==="add")
                    return true
                  else
                    return interview.interviews?.length>0
                })
                .map((interview,i)=>(
                  <option  value={interview.id} key={i}>{interview.company.name} - {interview.jobTitle} </option>
                ))}
              </select>

              {modaltype==='edit'
                ? 
                  <select name="" id="" 
                    value={
                      selectedApplication.interviews.find(
                        round => round.round === Number(selectedRound)
                      ).round
                    }
                    onChange={(e) => {
                      // console.log(e.target.value)
                      return setSelectedRound(Number(e.target.value))
                    }}
                  >
                    {selectedApplication.interviews.map((round,i)=>(
                      <option value={round.round} key={i}>{`Round ${round.round}`}</option>

                    ))}
                  </select>
                : <p>Round {nextRound}</p>}
               
              <label htmlFor="type">Round Type</label>
              <input
                name="type"
                id="type"
                value={newRound.type}
                onChange={handleChange}
                placeholder="e.g. HR, Technical, System Design"
                className="w-full border p-2 rounded mb-2"
                required
              />
              <label htmlFor="mode">Round Mode</label>
              <select
                name="mode"
                id="mode"
                value={newRound.mode}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-4"
                required
              >
                <option value="virtual">Virtual</option>
                <option value="in-person">In-Person</option>
              </select>

              {/* Date */}
              <label htmlFor="date">Interview Date</label>
              <input
                name="date"
                value={newRound.date}
                onChange={handleChange}
                type="date"
                className="w-full border p-2 rounded mb-2"
                required
              />

              {/* Time and duration */}
              <div className="flex gap-2 mb-2">
                <div className="w-1/2">
                  <label htmlFor="time.start">Start Time</label>
                  <input
                    name="time.start"
                    id="time.start"
                    value={newRound.time.start}
                    onChange={handleChange}
                    placeholder="Start Time"
                    type="time"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="time.duration">Duration</label>
                  <input
                    name="time.duration"
                    value={newRound.time.duration}
                    onChange={handleChange}
                    placeholder="Duration in minutes"
                    type="number"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
              </div>

                {/* details, this will be sentences, I have to split it by '.' */}
              <label htmlFor="details">Details</label>
              <input
                name="details"
                value={newRound.details}
                onChange={handleChange}
                placeholder="e.g. Introduction. Resume review. Culture fit discussion."
                className="w-full border p-2 rounded mb-2"
                required
              />

              <label htmlFor="interviewer">Interviewer</label>
              <input
                name="interviewer"
                value={newRound.interviewer}
                onChange={handleChange}
                placeholder="e.g. Jane Smith (Engineering Manager)"
                className="w-full border p-2 rounded mb-2"
                required
              />

              <label htmlFor="meetingLink">Meeting Link</label>
              <input
                name="meetingLink"
                value={newRound.meetingLink}
                onChange={handleChange}
                placeholder="Zoom / Google Meet"
                className="w-full border p-2 rounded mb-2"
                type="text"
              />
  
              <label htmlFor="notes">Notes</label>        
              <input
                name="notes"
                value={newRound.notes}
                onChange={handleChange}
                placeholder="Preparation notes or reminders"
                className="w-full border p-2 rounded mb-2"
                required
              />

             

              <label htmlFor="status">Status</label>
               <select
                name="status"
                value={newRound.status}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-4"
              >
                <option value="upcoming">Upcoming</option>
                <option value="failed">Failed</option>
                <option value="passed">Passed</option>
              </select>

              

              <button
                type='submit'
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {modaltype=="edit" ? "Edit" : "Add"} Interview
              </button>

              <button
                onClick={()=>{
                  setNewRound({
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
