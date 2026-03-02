

export default function AddJob({ setAddJobModal }){
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={() => setAddJobModal(false)}
    >
      <div 
        className="w-1/2 h-1/2 bg-white rounded-xl shadow-xl p-6 relative "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div 
          className="absolute flex top-4 left-6 w-7 h-7  justify-center items-center rounded-full hover:bg-gray-200"
          onClick={()=>{setAddJobModal(false)}}

        >
          <button className="text-xl leading-none">&times;</button>
        </div>
      </div>
    </div>
  )
}