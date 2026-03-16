
const userId = localStorage.getItem('userId') || 1

export  async function getUserDetails(userId){

  const res = await fetch(`http://localhost:8000/users/${userId}`)
  const data = await res.json()

  const exists = data.data

  if (exists) {
    console.log("Data exists")
    console.log(data)
  }else{
    console.log("Data doesn't exists")
  }
}



  // const interviewList = interviewList;

//this was used to add initial data
export  async function resetData(applicationJson){
  const res = await fetch('http://localhost:8000/users/aryan',{
  method: 'POST',
  headers:{
    "Content-Type": "application/json"
  },
  body: JSON.stringify(applicationJson)
  })

  const data = await res.json(); // read response from backend
  console.log(data);
}

export async function getAllDataOfUser(userId){

  const applicationRes = await fetch(`http://localhost:8000/users/${userId}/applications`,
    {
      method:"GET"
    }
  )
  const applicationData = await applicationRes.json()

  // console.log(applicationData)

  const interviewRes = await fetch(`http://localhost:8000/users/${userId}/interviews`,
    {
      method:"GET"
    }
  )
  const interviewData = await interviewRes.json()

  const applicationJson = applicationData.data.map(application=>{
    const currentInterviewData = interviewData.data?.filter(interview=>interview.applicationId === application.id)

    if(currentInterviewData.length === 0 ){
      return application
    }else{
      currentInterviewData.sort((a,b)=>b.round-a.round)
      return {...application, interviews:currentInterviewData}
    }
  })

  return applicationJson
}