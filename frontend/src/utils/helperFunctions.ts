import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { Application, Interview } from "../types"


// export function mainSearch( setInterviewJson, value){
//   setInterviewJson(prev=>({
//     prev.filter(info=>{
//       console.log(info.company.name)
//       if(info.company.name.includes(value))
//         return true
//     })
//   }))
// i}

export function formatLongDate(date: string): string{
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
}

export function urlToLogoLink(url: string | undefined): string{
  if (!url) return "";
  let cleanUrl = url

  if (cleanUrl.includes("https://")) {
    cleanUrl = url.split('/')[2] || ""
  }

  return `https://img.logo.dev/${url}?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&format=png&retina=true`
}

export function addingAmPm(time: string) {
  const [hrStr, min] = time.split(':')
  const hr = Number(hrStr);

  if (hr > 12) {
    return `${hr - 12}:${min} PM`
  } else {
    return `${time} AM`
  }
}

export function capitalise(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const allMonths = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]
export function getLast6Month(month: number){

  const months = []
  
  for(let i = month-5; i<=month;i+=1){
    const index = (i + 12) % 12
    months.push(allMonths[index])
  }
  // console.log(months)
  return months
}

/* export function dateInYYYYMMDD(now:string){
  const date = new Date(now);

  const formatted =
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");

  return formatted
} */

export function interviewInLast6Months(applicationJson: Application[]){
  const withInterview = applicationJson?.filter(info=>info?.stage?.toLowerCase() === "interview" && info?.interviews?.length>0)

  const onlyRound:[Application["company"], ...Interview[]][] = withInterview.map(info=>([info.company, ...info.interviews ]))

  
  let last6Month = []
  const nowDate = new Date()

  for (let i = 5; i > -1; i--) {
    const date = new Date(nowDate)
    date.setMonth(date.getMonth() - i)
    last6Month.push({value:date.toISOString().slice(0,7), count:0, companies:{}})
  }

  /*  const last6MonthCounts =  */

  last6Month.forEach(month=>{
    onlyRound.map(interview=>{
      (interview.slice(1) as Interview[]).map(round=>{
        if(round.date.includes(month.value)){
          month.count+=1
        }
      })
    })
  })

  const bars = last6Month.map(month=>month.count)
  
  return bars
}

export function cn(...inputs:string[]){
  return twMerge(clsx(inputs))
}

//This function is used to convert data from the server after updated interview round to get 
// data in type Interview

export function refactorInterview(res:any):Interview{
  console.log(res)
  const serverRes = res.reply.rows[0]

  const updatedRound:Interview = {
    id:serverRes.id,
    applicationId: serverRes.application_id,
    date: serverRes.date,
    details: serverRes.details,
    interviewer: serverRes.interviewer,
    meetingLink: serverRes.meeting_link,
    mode: serverRes.mode,
    notes: serverRes.notes,
    round: serverRes.round,
    status: serverRes.status,
    time: {
      start: serverRes.start_time,
      duration: serverRes.duration_minutes,
    },
    type: serverRes.type,
    userId: serverRes.user_id,
  }
  return updatedRound
}

export function refactorApplication(res:any):Application{
  console.log(res)
  const serverRes = res.reply.rows[0]

  const updatedApplication:Application = {
    id: serverRes.id,
    userId: serverRes.user_id,
    company: { 
      logoLink: serverRes.company_logo_link, 
      name: serverRes.company_name, 
      location: serverRes.company_location,
      url: serverRes.company_url
    },
    interviews:[],
    jobTitle: serverRes.job_title,
    salaryRange: { min: serverRes.salary_min, max: serverRes.salary_max },
    date: new Date(serverRes.applied_date).toISOString().slice(0, 10),
    stage: serverRes.stage,
    resumeId: serverRes.resume_id, 
    isDeleted: serverRes.is_deleted,
    source: serverRes.source,
    notes: serverRes.notes,
  }
  return updatedApplication
}