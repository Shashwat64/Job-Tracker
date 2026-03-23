import { useRef, useEffect, useContext } from "react";

import { JobContext } from '../../App'

import { deleteApplication } from "../../api/users";

export default function Dropdown({ openModalId, setOpenModalId, id, setAddJobModal }) {
  const dropdownRef = useRef()

  console.log("id in the dropdown",id)

  const {applicationJson, setApplicationJson} = useContext(JobContext)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenModalId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [id])

  if (openModalId !== id) return null


  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-40"
    >
      <button 
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={()=>{
          setAddJobModal(true)
        }}
      >
        Edit
      </button>
      <button 
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={async() => {

          
          setApplicationJson(prev => prev.map(application => 
            application.id === id 
            ? { ...application, isDeleted: true }
            : application
          ))
          await deleteApplication(id)
      }}
      >
        Delete
      </button>
    </div>
  );
}