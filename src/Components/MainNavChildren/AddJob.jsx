import { useState } from 'react'

export default function AddJob({ setAddJobModal, setInterviewJson, interviewJson }){
  

  console.log(interviewJson)
  const nextId = interviewJson[interviewJson.length-1].id + 1


  const [newJob, setNewJob] = useState({
    id:nextId,
    company: { logoLink: "", name: "", location: "" },
    jobTitle: "",
    salaryRange: { min: "", max: "" },
    date: "",
    interviewType: "Virtual",
    stage: "Pending",
    deleted:false
  })

  function handleChange(e){
    const {name, value} = e.currentTarget

    if(name.includes('company.')){
      const key = name.split('.')[1]
      setNewJob(prev=>({
        ...prev,
        company:{...prev.company, [key]:value}
      }))
    }else if(name.includes('salaryRange.')){
      const key = name.split('.')[1]
      setNewJob(prev=>({
        ...prev,
        salaryRange:{...prev.salaryRange, [key]: Number(value)}
      }))
    }else{
      setNewJob((prev) => ({ ...prev, [name]: value }))
    }
    
  }
  
  function handleSubmit(e){
    e.preventDefault()
    const formData = e.currentTarget
    
    if (newJob.salaryRange.max < newJob.salaryRange.min) {
      alert("Max salary must be greater than min salary");
      return;
    }

    
    
    setAddJobModal(false)
    setInterviewJson(prev=>([
      ...prev,
      {...newJob, }
    ]))



    console.log(formData)
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={() => setAddJobModal(false)}
    >
      <div 
        className="min-w-100 min-h-150 w-1/3 h-2/3 bg-white rounded-xl shadow-xl p-6 relative "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div 
          className="absolute flex top-8 left-6 w-7 h-7  justify-center items-center rounded-full hover:bg-gray-200"
          onClick={()=>{setAddJobModal(false)}}
        >
          <button className="text-xl leading-none">&times;</button>
        </div>

        <div className=" flex justify-center items-center w-full h-full p-8 gap-4">
          <form 
            className=" gap-8 items-center "
            onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}>
           <input
          name="company.name"
          value={newJob.company.name}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          name="company.logoLink"
          value={newJob.company.logoLink}
          onChange={handleChange}
          placeholder="Company Logo URL"
          className="w-full border p-2 rounded mb-2"
          type="url"
        />
        <input
          name="company.location"
          value={newJob.company.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded mb-2"
        />

        {/* Job Title */}
        <input
          name="jobTitle"
          value={newJob.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-2 rounded mb-2"
        />

        {/* Salary */}
        <div className="flex gap-2 mb-2">
          <input
            name="salaryRange.min"
            value={newJob.salaryRange.min}
            onChange={handleChange}
            placeholder="Min Salary"
            type="number"
            className="w-1/2 border p-2 rounded"
          />
          <input
            name="salaryRange.max"
            value={newJob.salaryRange.max}
            onChange={handleChange}
            placeholder="Max Salary"
            type="number"
            className="w-1/2 border p-2 rounded"
          />
        </div>

        {/* Date */}
        <input
          name="date"
          value={newJob.date}
          onChange={handleChange}
          type="date"
          className="w-full border p-2 rounded mb-2"
        />

        {/* Interview Type */}
        <select
          name="interviewType"
          value={newJob.interviewType}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        >
          <option value="Virtual">Virtual</option>
          <option value="In-person">In-person</option>
        </select>

        {/* Stage */}
        <select
          name="stage"
          value={newJob.stage}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="Pending">Pending</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Job
        </button>

        <button
          onClick={()=>{
            setNewJob({
            company: { logoLink: "", name: "", location: "" },
            jobTitle: "",
            salaryRange: { min: "", max: "" },
            date: "",
            interviewType: "Virtual",
            stage: "Pending",
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
  )
}

/* Data that I need
  id: 0,  //arr.length or last element id + 1
    company: { 
      logoLink: googleLogo, //I will need the name or most likely the url
      name: "Google", //Simple
      location: "Bengaluru, India" },  //Simple
    jobTitle: "Frontend Developer", //Simple
    salaryRange: { min: 1800000, max: 2800000 }, //Simple and add the condition that max should be more than min
    date: "2026-03-12", //add input type data
    interviewType: "Virtual", //add options
    stage: "Pending", //options
    deleted:false //default

*/