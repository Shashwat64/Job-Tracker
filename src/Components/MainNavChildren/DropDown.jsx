import { useRef, useEffect } from "react";

export default function DropDown({ openModalId, setOpenModalId, id }) {
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenModalId(null); // close dropdown
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [id]);

  if (openModalId !== id) return null
  

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50"
    >
      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
        Edit
      </button>
      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
        Delete
      </button>
    </div>
  );
}