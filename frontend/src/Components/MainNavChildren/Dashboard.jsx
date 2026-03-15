import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'

import { JobContext} from '../../App'

import { getLast6Month, interviewInLast6Months } from '../../utils/helperFunctions'

import { urlToLogoLink } from '../../utils/helperFunctions'



//Its the lower most upcomign interview
const ApplicationItem = ({ companyName, type, jobTitle, date, time, id, logoLink }) => (
  <div className="px-6 py-4 flex justify-between items-center  hover:bg-gray-100 hover:cursor-pointer
 transition">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded bg-white flex items-center justify-center font-bold text-gray-700">
        <img src={urlToLogoLink(logoLink)} alt="" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{companyName}</p>
        <p className="text-xs text-gray-500">{type} Round • {jobTitle}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-gray-900">{date}</p>
      <p className="text-xs text-gray-500">{time.start}</p>
    </div>
  </div>
)
// id:info.id, jobTitle:info.jobTitle, companyName: info.company.name


/* const upcomingInterviews = [
  { company: "Cisco", round: "Technical Round 1", position: "Network Software Engineer", date: "Apr 15, 2026", time: "10:00 AM - 11:00 AM" },
  { company: "Oracle", round: "HR Screening", position: "Cloud Engineer", date: "Apr 18, 2026", time: "02:30 PM - 03:00 PM" },
]  */









export default function Dashboard() {

  const [hovered, setHovered] = useState(null) //have to remove this

  const { applicationJson, activeBtn, setActiveBtn } = useContext(JobContext)

  const navigate = useNavigate()

  const now = new Date()
  const month = now.getMonth()
  // console.log(month)

  
  const numOfInterviewInMonth = interviewInLast6Months(applicationJson)
  // console.log(numOfInterviewInMonth) 
  
  const maxInterviewInMonth = Math.max(...numOfInterviewInMonth.map(d => d))
  // console.log(maxInterviewInMonth)
  
  const bars = numOfInterviewInMonth.map(num=>(num/maxInterviewInMonth)*100)

  const months = getLast6Month(month).map(name=>name.slice(0,3))


  interviewInLast6Months(applicationJson)


  const statusCounts = applicationJson.filter(info=>!info.isDeleted)
  .reduce((acc, job) => {
    acc.total = (acc.total || 0) + 1 
    acc[job.stage] = (acc[job.stage] || 0) + 1 
    return acc 
  }, {})


  const cards = [
    { title: "Total Applied", value: statusCounts.total || 0 },
    { title: "Pending", value: statusCounts.Pending || 0, badge: { label: "Active", style: "text-amber-500 bg-amber-50" } },
    { title: "Shortlisted", value: statusCounts.Shortlisted || 0 , badge: { label: "+1 this week", style: "text-emerald-600 bg-emerald-50" } },
    { title: "Interview", value: statusCounts.Interview || 0  },
    { title: "Offer", value: statusCounts.Offer || 0  },
    { title: "Rejected", value: statusCounts.Refected || 0 }
  ]

  // console.log(cards)

  //Top 6 cards
  const KPICard = ({ title, value, badge }) => (
    <div 
      className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-100 hover:cursor-pointer
      : transition duration-75 active:scale-95"
      onClick={()=>{
        setActiveBtn(
          title === "Total Applied"
            ? "all"
            : title.toLowerCase()
        )
        navigate("../jobs")
      }}
    >
      <h3 className="text-sm text-gray-500 font-medium mb-1">{title}</h3>
      <div className="flex items-baseline space-x-2">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        {badge && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badge.style}`}>
            {badge.label}
          </span>
        )}
      </div>
    </div>
  )
  // console.log(applicationJson)

  //Upcoming Interview
  const upcomingInterviews = applicationJson.filter(info=>info.interviews?.length)
    .filter(info=>info.interviews[0].status.toLowerCase()==="upcoming")
    .map(info=>({id:info.id, jobTitle:info.jobTitle, companyName: info.company.name, logoLink:info.company.url ,...info.interviews[0]}))
    .sort((a,b)=>b.date.localeCompare(a.date))

  console.log(upcomingInterviews)
  console.log(upcomingInterviews)


  return (
    <div className=" bg-gray-100 p-8 font-sans text-gray-800 grow select-none ml-60 h-screen">
      <div className="w-full h-full space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center bg-white hover:bg-gray-50">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {cards.map((kpi, i) => <KPICard key={i} {...kpi} />)}
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col h-80">
            <h3 className="text-sm font-semibold text-gray-800 mb-12">Interview Activity (Last 6 Months)</h3>
            <div className="flex-1 flex items-end space-x-4 justify-center">
              {bars.map((height, i) => (
                <div 
                  key={i} 
                  className="w-10 bg-gray-400 rounded-t-sm relative" 
                  style={{ height: `${height}%` }} 
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {hovered === i && (
                    <div className='absolute -top-15 left-1/2 -translate-x-1/2 text-white/90 border bg-[#1E2A38] px-2 py-1 z-10 w-30 text-center'>    
                      Number of Interview: {numOfInterviewInMonth[i]}
                      <div className="absolute top-full left-1/2 -translate-x-1/2
                        w-0 h-0
                        border-l-[6px] border-l-transparent
                        border-r-[6px] border-r-transparent
                        border-t-[6px] border-t-black">
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-8 text-xs text-gray-400 border-t border-gray-100 pt-2">
              {months.map(m => <span key={m}>{m}</span>)}
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col h-80">
            <h3 className="text-sm font-semibold text-gray-800 mb-6">Round Breakdown</h3>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-15 border-amber-400 border-r-emerald-500 border-b-gray-200 border-l-amber-400" />
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-amber-400 mr-2" />Pending</div>
              <div className="flex items-center text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />Shortlisted</div>
            </div>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-800">Upcoming Interviews</h3>
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">View Calendar →</button>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingInterviews.map((interview, i) => <ApplicationItem key={i} {...interview} />)}
          </div>
        </div>

      </div>
    </div>
  ) 
}

/* { company, round, position, date, time } */