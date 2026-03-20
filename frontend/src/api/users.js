
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

  console.log("resetData ran")

  const res = await fetch('http://localhost:8000/users/reset',{
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

  console.log("getAllDataOfUser was called")

  const applicationRes = await fetch(`http://localhost:8000/users/${userId}/applications`,
    {
      method:"GET"
    }
  )
  const applicationData = await applicationRes.json()

  console.log(applicationData)

  const interviewRes = await fetch(`http://localhost:8000/users/${userId}/interviews`,
    {
      method:"GET"
    }
  )
  const interviewData = await interviewRes.json()

  if(interviewData.length>0){
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
  else if(applicationData.length>0){
    return applicationData
  }else{
    return []
  }

}


export async function updateApplication(application){
  const interviewRes = await fetch(`http://localhost:8000/users/${userId}/applications`,
    {
      method:"PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application)
    }
  )
  const reply = await interviewRes.json()
  return reply
}

export async function updateInterviews(interviews){
  const interviewRes = await fetch(`http://localhost:8000/users/${userId}/interviews`,
    {
      method:"PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(interviews)
    }
  )
  const reply = await interviewRes.json()
  return reply
}

export async function isSignedIn(){
  const authRes = await fetch("http://localhost:8000/auth/me", {
    credentials: 'include'
  })

  const data = await authRes.json()

  const userData  = await getUserData(data.id)

  if(authRes.ok){
    console.log("User Signed in")
    return userData
  }else{
    console.log("User not Signed in")
    return false 
  }
}

export async function getUserData(id){
  const usersRes = await fetch(`http://localhost:8000/users/${id}`, {
    method:"GET",
    credentials: 'include'
  }) 

  const userData = await usersRes.json()

  return userData

}


export async function signOutUser(){
  const usersRes = await fetch(`http://localhost:8000/auth/signout`, {
    method:"POST",
    credentials: 'include'
  }) 

  // const userData = await usersRes.json()

  // return userData

}