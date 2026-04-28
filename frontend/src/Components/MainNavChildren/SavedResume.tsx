import { useState, useEffect } from 'react'

export default function SavedResume() {
  const [resumes, setResumes] = useState([])
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const openPdf = async (fileUrl:string) => {
    const viewableUrl = fileUrl
      .replace('/raw/upload/', '/image/upload/')
      + '.pdf'
      
    const res = await fetch(viewableUrl)
    const blob = await res.blob()
    const blobUrl = URL.createObjectURL(blob)
    window.open(blobUrl, '_blank')
  }

  // fetch all resumes when page loads
  useEffect(() => {
    const fetchResumes = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/resume`, {
        credentials: 'include'
      })
      const data = await res.json()
      setResumes(data.resumes)
    }
    fetchResumes()
  }, [])

  const handleUpload = async () => {
    if (!file || !name) return alert('Please provide a name and a file')

    const formData = new FormData()
    formData.append('resume', file)
    formData.append('name', name)

    setLoading(true)
    const res = await fetch(`${import.meta.env.VITE_API_URL}/resume/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      setResumes([data.resume, ...resumes])  // add new resume to the list
      setFile(null)
      setName('')
    }
  }

  const handleDelete = async (resumeId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/resume/${resumeId}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    if (res.ok) {
      setResumes(resumes.filter(r => r.id !== resumeId))  // remove from list
    }
  }

  return (
    <main className='ml-60 p-8'>
      <h2 className='text-2xl font-bold mb-6'>Saved Resumes</h2>

      {/* upload section */}
      <div className='mb-8'>
        <input
          type='text'
          placeholder='Resume name e.g. SWE Resume v2'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='border p-2 mr-4 rounded'
        />
        <input
          type='file'
          accept='.pdf,.doc,.docx'
          onChange={(e) => setFile(e.target.files[0])}
          className='mr-4'
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {/* resumes list */}
      {/* <iframe 
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(resume.file_url)}&embedded=true`}
        width='100%'
        height='500px'
      /> */}
      {resumes.map(resume => {
        const viewableUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(resume.file_url)}`

        return (
          <div key={resume.id} className='border p-4 rounded mb-3'>
            <div className='flex items-center justify-between mb-3'>
              <p className='font-medium'>{resume.name}</p>
              <button
                onClick={() => handleDelete(resume.id)}
                className='text-red-500'
              >
                Delete
              </button>
            </div>
            <a href={viewableUrl} target='_blank' className='text-blue-500 text-sm'>
              View Resume
            </a>
          </div>
        )
      })}
    </main>
  )
}