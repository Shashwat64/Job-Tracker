

export  async function getUserDetails(userId){

  const res = await fetch(`http://localhost:8000/users/get/user`)
  const data = await res.json()

  const exists = data.data

  if (exists) {
    console.log("Data exists")
    console.log(data)
  }else{
    console.log("Data doesn't exists")
  }
}

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

  const applicationRes = await fetch(`http://localhost:8000/users/get/applications`,
    {
      method:"GET",
      credentials: 'include'
    }
  )
  const applicationData = await applicationRes.json()

  const interviewRes = await fetch(`http://localhost:8000/users/get/interviews`,
    {
      method:"GET",
      credentials: 'include'
    }
  )
  const interviewData = await interviewRes.json()

  console.log("interviewData in getAllDataOfUser is ", interviewData)
  console.log("applicationData in getAllDataOfUser is ", applicationData)

  if(interviewData?.data?.length>=1){

    console.log("this should not run")

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
  else if(applicationData.data.length>0){
    console.log("applicationData.data is", applicationData.data)
    return applicationData.data
  }else{
    return []
  }

}

export async function addApplication(application){
  console.log(application)

  const applicationRes = await fetch(`http://localhost:8000/users/post/application`,
    {
      method:"POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({application})
    }
  )
  const reply = await applicationRes.json()
  return reply
}

export async function updateApplication(application){
  console.log(userId)

  const interviewRes = await fetch(`http://localhost:8000/users/patch/application`,
    {
      method:"PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(application)
    }
  )
  const reply = await interviewRes.json()
  return reply
}

export async function deleteApplication(applicationId){

  const applicationRes = await fetch(`http://localhost:8000/users/delete/application`,
    {
      method:"DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({applicationId})
    }
  )
  const reply = await applicationRes.json()
  return reply
}

export async function addInterview(interview, applicationId){
  console.log(interview)
  console.log(applicationId)

  const interviewRes = await fetch(`http://localhost:8000/users/post/interview`,
    {
      method:"POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({interview, applicationId})
    }
  )
  const reply = await interviewRes.json()
  console.log(reply)
  return reply
}

export async function updateInterview(round){
  const interviewRes = await fetch(`http://localhost:8000/users/patch/interview`,
    {
      method:"PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(round)
    }
  )
  const reply = await interviewRes.json()
  return reply
}

// export async function deleteInterviews(interviewsId){

//   const interviewRes = await fetch(`http://localhost:8000/users/delete/application`,
//     {
//       method:"DELETE",
//       headers: { "Content-Type": "application/json" },
//       credentials: 'include',
//       body: JSON.stringify({interviewsId})
//     }
//   )
//   const reply = await interviewRes.json()
//   return reply
// }

export async function isSignedIn(){
  const authRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
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
  const usersRes = await fetch(`http://localhost:8000/users/get/user`, {
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