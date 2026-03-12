import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"


// export function mainSearch( setInterviewJson, value){
//   setInterviewJson(prev=>({
//     prev.filter(info=>{
//       console.log(info.company.name)
//       if(info.company.name.includes(value))
//         return true
//     })
//   }))
// i}

export function formatLongDate(date){
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
}

export function urlToLogoLink(url){
  return `https://img.logo.dev/${url}?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
}

export function addingAmPm(time){

  let [hr, min] = time.split(':')
  hr = Number(hr)

  if(hr>12){
    return `${hr-12}:${min} PM`
  }else{
    return `${time} AM`
  }
}

export function capitalise(string){
  return string[0].toUpperCase() + string.slice(1)
}

const allMonths = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]
export function getLast6Month(month){

  const months = []
  
  for(let i = month-5; i<=month;i+=1){
    const index = (i + 12) % 12
    months.push(allMonths[index])
  }
  // console.log(months)
  return months
}

export function dateInYYYYMMDD(now){
  const date = new Date(now);

  const formatted =
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");

  return formatted
}

export function interviewInLast6Months(interviewJson){
  const withInterview = interviewJson.filter(info=>info.stage.toLowerCase() === "interview" && info?.interviews?.length>0)

  const onlyRound = withInterview.map(info=>([info.company, ...info.interviews ]))

  
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
      interview.slice(1).map(round=>{
        if(round.date.includes(month.value)){
          month.count+=1
        }
      })
    })
  })

  const bars = last6Month.map(month=>month.count)
  
  return bars
}

export function cn(...inputs){
  return twMerge(clsx(inputs))
}

//Color Palatte

const darkColorPalette = {
  bg: {
    page:  "bg-[#0f172a]",
    card:  "bg-[#1e293b]",
    raised:"bg-[#334155]",
  },
  text: {
    primary:   "text-[#f8fafc]",
    secondary: "text-[#94a3b8]",
    muted:     "text-[#64748b]",
  },
  border: {
    default: "border-[#334155]",
    strong:  "border-[#475569]",
  },
  status: {
    applied:   "bg-[#94a3b8]/10 text-[#94a3b8]",
    interview: "bg-[#f97316]/10 text-[#fdba74]",
    offer:     "bg-[#4ade80]/10 text-[#4ade80]",
    rejected:  "bg-[#f87171]/10 text-[#f87171]",
  }
}

const lightColorPalette = {
  bg: {
    page:  "bg-[#f1f5f9]",
    card:  "bg-[#ffffff]",
    raised:"bg-[#f8fafc]",
  },
  text: {
    primary:   "text-[#0f172a]",
    secondary: "text-[#475569]",
    muted:     "text-[#94a3b8]",
  },
  border: {
    default: "border-[#e2e8f0]",
    strong:  "border-[#cbd5e1]",
  },
  status: {
    applied:   "bg-[#475569]/10 text-[#475569]",
    interview: "bg-[#f97316]/10 text-[#ea580c]",
    offer:     "bg-[#16a34a]/10 text-[#16a34a]",
    rejected:  "bg-[#dc2626]/10 text-[#dc2626]",
  }
}

export const getTokens = (theme = "light") =>
  theme === "dark" ? darkColorPalette : lightColorPalette