import { useState,useContext, useEffect, useRef } from 'react'

import { JobContext } from '../../App'

import { updateApplication, addApplication } from '../../api/users'
import { data } from 'react-router-dom'

export default function AddJob({ setAddJobModal, openModalId, setOpenModalId }){
  
  const {applicationJson, setApplicationJson, activeBtn, userData} = useContext(JobContext)

  
  console.log(applicationJson)
  
  console.log("openModalId", openModalId)
  
  const [editId] = useState(openModalId)
  
  console.log("editId is ", editId)

  console.log(editId)

  useEffect(()=>{
    setOpenModalId(null)
  },[])

  console.log("editId " + editId)



  let thatData

  if(editId===null){
    thatData = {
      company: { logoLink: "", name: "", location: "", url:"" },
      jobTitle: "",
      salaryRange: { min: "", max: "" },
      date: "",
      interviewType: "Virtual",
      stage: "Pending",
      isDeleted:false,
      interview:[]
    }
  }else{
    thatData = applicationJson.find(application=>application.id === editId)
    // console.log(applicationJson[editId-1])
  }

  console.log(editId)
  console.log(applicationJson[0].id)

  console.log(thatData)


  const [newJob, setNewJob] = useState(thatData)

  console.log(newJob)

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

  console.log(newJob)

  console.log(newJob.company)
  
  async function handleSubmit(e){
    e.preventDefault()
    
    if (newJob.salaryRange.max < newJob.salaryRange.min) {
      alert("Max salary must be greater than min salary");
      return;
    }

    console.log("newJob in handleSubmit ", newJob)
    
    let cleanUrl = newJob.company.url
    if (cleanUrl.includes("https://")) {
      cleanUrl = newJob.company.url.split('/')[2]
    }

    console.log("cleanURL is", cleanUrl)
    // const reply = await updateApplication(newJob, userData.id)
    // console.log(reply)

    console.log("applicationJson is", applicationJson)
    console.log("newJob is", newJob)
    
    setAddJobModal(false)
    if(!applicationJson?.length){ //this is for adding application for the first time
      setApplicationJson([{...newJob, company:{...newJob.company, logoLink:`https://img.logo.dev/${cleanUrl}?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&retina=true`}}])
      const reply = await addApplication(newJob)
    }
    else if(editId===null){ //this is for adding new applications
      setApplicationJson(prev=>([
        ...prev,
        {...newJob, company:{...newJob.company, logoLink:`https://img.logo.dev/${cleanUrl}?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&retina=true`}}
      ]))

      const reply = await addApplication(newJob)
    }
    
    else{
      const index = applicationJson.findIndex(item => item.id === editId)
      console.log("else block ran and value of index is", index)

      updateApplication(newJob)
      
      setApplicationJson(prev=>([
        ...prev.slice(0,index),
        {...newJob, company:{...newJob.company, logoLink:`https://img.logo.dev/${cleanUrl}?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&retina=true`}},
        ...prev.slice(index+1)
      ]))
    }

    

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
            onSubmit={handleSubmit}>
            <input
              name="company.name"
              value={newJob.company.name}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full border p-2 rounded mb-2"
              required
            />
            <input
              name="company.url"
              value={newJob.company.url}
              onChange={handleChange}
              placeholder="Company Website"
              className="w-full border p-2 rounded mb-2"
              type="text"
              required
            />
            <input
              name="company.location"
              value={newJob.company.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border p-2 rounded mb-2"
              required
            />

            {/* Job Title */}
            <input
              name="jobTitle"
              value={newJob.jobTitle}
              onChange={handleChange}
              placeholder="Job Title"
              className="w-full border p-2 rounded mb-2"
              required
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
                required
              />
              <input
                name="salaryRange.max"
                value={newJob.salaryRange.max}
                onChange={handleChange}
                placeholder="Max Salary"
                type="number"
                className="w-1/2 border p-2 rounded"
                required
              />
            </div>

            {/* Date */}
            <input
              name="date"
              value={newJob.date}
              onChange={handleChange}
              type="date"
              className="w-full border p-2 rounded mb-2"
              required
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
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              type='submit'
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editId!==null ? "Edit" : "Add"} Job
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
    isDeleted:false //default

*/