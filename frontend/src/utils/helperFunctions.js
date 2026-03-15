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

export function interviewInLast6Months(applicationJson){
  const withInterview = applicationJson.filter(info=>info.stage.toLowerCase() === "interview" && info?.interviews?.length>0)

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


