
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

export  async function putAllData(applicationJson){
  const res = fetch('http://localhost:8000/users/aryan',{
  method: 'POST',
  headers:{
    "Content-Type": "application/json"
  },
  body: JSON.stringify(applicationJson)
  })

  const data = await res.json(); // read response from backend
  console.log(data);
}