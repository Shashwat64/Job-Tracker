import { useState,useContext, useEffect, useRef } from 'react'

import { JobContext } from '../../App'

import { updateApplication, addApplication } from '../../api/users'

export default function AddJob({ setAddJobModal, openModalId, setOpenModalId }){
  
  const {applicationJson, setApplicationJson, activeBtn, userData} = useContext(JobContext)

  
  console.log(applicationJson)
  // console.log(applicationJson[0].id)
  
  console.log("openModalId", openModalId)
  
  const [editId, setEditID] = useState(openModalId)
  const [resumes, setResumes] = useState([])
  
  console.log("editId is ", editId)

  console.log(editId)

  useEffect(()=>{
    setEditID(openModalId)
    setOpenModalId(null)
  },[])

  console.log("editId " + editId)
  console.log("openModalId " + openModalId)

  //getting resume
  useEffect(() => {
    const fetchResumes = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/resume`, {
        credentials: 'include'
      })
      const data = await res.json()
      setResumes(data.resumes)
    }
    fetchResumes()
  }, [])

  console.log(resumes)



  let thatData

  if(editId===null){
    thatData = {
      company: { logoLink: "", name: "", location: "", url:"" },
      jobTitle: "",
      salaryRange: { min: "", max: "" },
      date: "",
      stage: "Pending",
      isDeleted:false,
      resumeId:null,
      interview:[]
    }
  }else{
    thatData = applicationJson.find(application=>application.id === editId)
    // console.log(applicationJson[editId-1])
  }


  console.log(thatData)


  const [newJob, setNewJob] = useState(thatData)


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

  async function handleSubmit(e){
    e.preventDefault()
    
    if (newJob.salaryRange.max < newJob.salaryRange.min) {
      alert("Max salary must be greater than min salary");
      return
    }
    console.log(newJob)

    console.log("newJob in handleSubmit ", newJob)
    
    let cleanUrl = newJob.company.url
    if (cleanUrl.includes("https://")) {
      cleanUrl = newJob.company.url.split('/')[2]
    }

    // console.log("cleanURL is", cleanUrl)
    // const reply = await updateApplication(newJob, userData.id)
    // console.log(reply)

    const updatedJob = {
      ...newJob, 
      company: {
        ...newJob.company, 
        logoLink: `https://img.logo.dev/${cleanUrl}?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&format=png&retina=true`
      }
    }


    setNewJob(prev=>({...prev, company:{...prev.company, logoLink:`https://img.logo.dev/${cleanUrl}?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&format=png&retina=true`}}))

    console.log("applicationJson is", applicationJson)
    console.log("newJob is", updatedJob)
    
    setAddJobModal(false)
    if(!applicationJson?.length){ //this is for adding application for the first time
      
      const reply = await addApplication(updatedJob)

      const row = reply.result.rows[0];


      setApplicationJson([{id: row.id, userId: row.user_id, ...updatedJob}])
    }
    else if(editId===null){ //this is for adding new applications
      const reply = await addApplication(updatedJob)

      const row = reply.result.rows[0];

      setApplicationJson(prev=>([
        ...prev,
        {id: row.id, userId: row.user_id, ...updatedJob}
      ]))

    }
    
    else{
      const index = applicationJson.findIndex(item => item.id === editId)
      console.log("else block ran and value of index is", index)

      updateApplication(updatedJob)
      
      setApplicationJson(prev=>([
        ...prev.slice(0,index),
        updatedJob,
        ...prev.slice(index+1)
      ]))
      
      const reply = await updateApplication(updatedJob)
      
    }

    

  }

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto bg-black/40"
      onClick={() => setAddJobModal(false)}
    >
      <div 
        className="min-w-100 min-h-150 w-1/3 h-2/3  bg-white rounded-xl shadow-xl p-6 relative overflow-y-auto "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div 
          className="absolute flex top-8  left-6 w-7 h-7  justify-center items-center rounded-full hover:bg-gray-200"
          onClick={()=>{setAddJobModal(false)}}
        >
          <button className="text-xl leading-none">&times;</button>
        </div>

        <div className=" flex justify-center items-center w-full h-full p-8 gap-4 overflow-y-auto">
          <form 
            className=" gap-8 items-center py-10"
            onSubmit={handleSubmit}>
            <label>
              Company Name
              <input
                name="company.name"
                value={newJob.company.name}
                onChange={handleChange}
                placeholder="Google"
                className="w-full border p-2 rounded mb-2"
                required
              />
            </label>

            <label>
              Company Website
              <input
                name="company.url"
                value={newJob.company.url}
                onChange={handleChange}
                placeholder="google.com"
                className="w-full border p-2 rounded mb-2"
                type="text"
                required
              />
            </label>

            <label>
              Location
              <input
                name="company.location"
                value={newJob.company.location}
                onChange={handleChange}
                placeholder="Delhi, India"
                className="w-full border p-2 rounded mb-2"
                required
              />
            </label>

            <label>
              Job Title
              <input
                name="jobTitle"
                value={newJob.jobTitle}
                onChange={handleChange}
                placeholder="Frontend Developer"
                className="w-full border p-2 rounded mb-2"
                required
              />
            </label>



            <div className="flex gap-2 mb-2">
              <label className='flex flex-col'>
                Minimum Salary
                <input
                  name="salaryRange.min"
                  value={newJob.salaryRange.min}
                  onChange={handleChange}
                  placeholder=""
                  type="number"
                  className="w-full border p-2 rounded"
                  required
                />
              </label>

              <label className='flex flex-col'>
                Maximum Salary
                <input
                  name="salaryRange.max"
                  value={newJob.salaryRange.max}
                  onChange={handleChange}
                  placeholder=""
                  type="number"
                  className="w-full border p-2 rounded"
                  required
                />
              </label>
            </div>

            {/* Date */}
            <label>
              Date
              <input
                name="date"
                value={newJob.date}
                onChange={handleChange}
                type="date"
                className="w-full border p-2 rounded mb-2"
                required
              />
            </label>

            <label>
              <select
                name="resumeId" 
                value={newJob.resumeId}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
              >
                <option value=''>No resume</option>
                {resumes.map(resume => (
                  <option key={resume.id} value={resume.id}>{resume.name}</option>
                ))}
              </select>
            </label>

            <label>
              Stage
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
            </label>

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
    stage: "Pending", //options
    isDeleted:false //default

*/