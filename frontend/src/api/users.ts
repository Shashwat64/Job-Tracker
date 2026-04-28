import type { Application, Interview, UserData, Error, InterviewInFrontend } from "../types.js"

/* export  async function getUserDetails(userId: number){

  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/get/user`,{
    credentials: 'include'
  })
  const data = await res.json()

  console.log(data)
  console.log("data")

  const exists: UserDetails | {error: string} = data.data

  if (exists) {
    console.log("Data exists")
    console.log(data)
  }else{
    console.log("Data doesn't exists")
  }
} */

/* export async function resetData(applicationJson: Application[]):Promise<void>{

  console.log("resetData ran")

  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/reset`,{
  method: 'POST',
  credentials: 'include',
  headers:{
    "Content-Type": "application/json"
  },
  body: JSON.stringify(applicationJson)
  })

  const data = await res.json(); // read response from backend
  console.log(data);
} */

export async function getAllDataOfUser(userId: number){

  console.log("getAllDataOfUser was called")

  const applicationRes = await fetch(`${import.meta.env.VITE_API_URL}/users/get/applications`,
    {
      method:"GET",
      credentials: 'include'
    }
  )
  const applicationData = await applicationRes.json()

  const interviewRes = await fetch(`${import.meta.env.VITE_API_URL}/users/get/interviews`,
    {
      method:"GET",
      credentials: 'include'
    }
  )
  const interviewData = await interviewRes.json()

  console.log("interviewData in getAllDataOfUser is ", interviewData)
  console.log("applicationData in getAllDataOfUser is ", applicationData)

  if(interviewData?.data?.length>=1 && applicationData?.data?.length>=1){

    console.log("this should not run")

    const applicationJson = applicationData.data.map((application: Application)=>{
      const currentInterviewData = interviewData.data?.filter((interview: Interview)=>interview.applicationId === application.id)
  
      if(currentInterviewData.length === 0 ){
        return {...application, interviews:[]}
      }else{
        currentInterviewData.sort((a:Interview,b:Interview)=>b.round-a.round)
        return {...application, interviews:currentInterviewData}
      }
    })
  
    return applicationJson
  }
  else if(applicationData?.data?.length>0){
    console.log("applicationData.data is", applicationData.data)
    return applicationData.data
  }else{
    return []
  }

}

export async function addApplication(application:Application){
  console.log(application)

  const applicationRes = await fetch(`${import.meta.env.VITE_API_URL}/users/post/application`,
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

export async function updateApplication(application:Application){

  console.log(application)
  const interviewRes = await fetch(`${import.meta.env.VITE_API_URL}/users/patch/application`,
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

export async function deleteApplication(applicationId: number){

  const applicationRes = await fetch(`${import.meta.env.VITE_API_URL}/users/delete/application`,
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

export async function addInterview(interview:InterviewInFrontend, applicationId: number){
  console.log(interview)
  console.log(applicationId)

  const interviewRes = await fetch(`${import.meta.env.VITE_API_URL}/users/post/interview`,
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

export async function updateInterview(round: InterviewInFrontend){
  const interviewRes = await fetch(`${import.meta.env.VITE_API_URL}/users/patch/interview`,
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



export async function getUserData(id: number): Promise<UserData | Error>{
  const usersRes = await fetch(`${import.meta.env.VITE_API_URL}/users/get/user`, {
    method:"GET",
    credentials: 'include'
  }) 

  const userData: UserData | Error = await usersRes.json()


  return userData

}

export async function isSignedIn(): Promise<UserData | Error | boolean>{
  const authRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    credentials: 'include'
  })

  if(!authRes.ok){
    console.log("User not Signed in")
    return false 
  }

  const data = await authRes.json()

  const userData:UserData | Error = await getUserData(data.id)
  console.log("User Signed in")
  return userData
}

export async function signIn(details: {email: string, password: string}){
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`,{
    method:"POST",
    credentials: 'include',
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details)
  })

  const data: {success:string} | Error = await res.json()

  if(res.ok){
    return true
  }else{
    return false
  }
}


type SignUpDetails = {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
}

export async function signUp(details: SignUpDetails){
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`,{
    method:"POST",
    credentials: 'include',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(details)
  })

  const reply = await res.json()
  console.log(reply)
  return reply  

}




export async function signOutUser(){
  const usersRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/signout`, {
    method:"POST",
    credentials: 'include'
  }) 

  // const userData = await usersRes.json()

  // return userData

}