
const userId = localStorage.getItem('userId') || 1

export default async function getUserDetails(userId){

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