import { Link } from 'react-router-dom'

export default function Interview(){
  return (
    <>
      <main className='bg-gray-100 grow p-8 ml-60 h-screen overflow-auto'>
        {/* {addJobModal && <AddJob setAddJobModal={setAddJobModal} openModalId = {openModalId} setOpenModalId={setOpenModalId}/>} */}
       
        <div className="w-full space-y-6 ">

        {/* Header */}
          <div className="flex justify-between items-center mb-8 ">
            <h1 className="text-2xl font-semibold text-gray-900">Interview</h1>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md px-4 py-2 text-sm w-64 bg-white outline-none focus:border-gray-400"
              />
              <button className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center bg-white hover:bg-gray-50">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
          <section className='flex bg-white p-4 rounded-lg justify-between shadow-sm'>
            <p className='ml-2'>Total Interview</p>
            <p className='mr-2'>Interview</p>
          </section>
        </div>
        </main>
    </>
  )
}