
import { JobContext } from "../../App";

import { useNavigate } from "react-router-dom";

import { signOutUser } from "../../api/users";

export default function ProfileDropdown(){

  const navigate = useNavigate()

  const handleLogout = async () => {
  try {
    await signOutUser()
    navigate("/signin")
  } catch (err) {
    console.error("Logout failed", err)
  }
};


  return(
    <div className="absolute bg-background -top-12 left-0 w-full p-2 rounded-lg">
      <button onClick={handleLogout}>Sign out</button>
    </div>
  )
}