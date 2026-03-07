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