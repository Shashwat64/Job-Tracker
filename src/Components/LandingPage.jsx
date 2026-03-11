import { useContext, useRef } from "react"
import { Link } from 'react-router-dom'

//logo and icon
import logoOrange from '../assets/logoOrange.png'

//helper function
import { getLast6Month, urlToLogoLink } from "../utils/helperFunctions"



//context
import { JobContext } from "../App"

export default function LandingPage(){
  const featuresRef = useRef(null)
  const howItWorksRef = useRef(null)
  const pricingRef = useRef(null)
  

  const {theme} = useContext(JobContext)

  const miniStats = [{name:"applied", value:20},{name:"pending", value:8},{name:"interiew", value:4},{name:"offers", value:2}]

  const now = new Date()
  const last6Month = getLast6Month(now.getMonth())
  console.log(last6Month)
  const graphH = [40, 50, 70, 80, 40, 30]

  //Features cards info
  const featuresCard = [
    {title:"Application Tracker", subTitle:"Log every job you apply to with status, company, role, and date. Never lose track of where you stand with any company."},
    {title:"Interview Scheduler", subTitle:"See all upcoming interviews in one place. Get reminders before each interview so you're never caught off guard."},
    {title:"Progress Dashboard", subTitle:"Visualize your job search with charts showing activity over time, status breakdowns, and weekly goal tracking."},
    {title:"Status Management", subTitle:"Track every stage. Applied, Shortlisted, Interview, Offer, Rejected. with color-coded badges that make status instant to read."},
    {title:"Smart Reminders", subTitle:"Automated follow-up reminders so you never go cold on a promising lead. Stay top of mind with every recruiter."},
    {title:"Notes & Documents", subTitle:"Attach notes, resume versions, and links to each application. Keep everything for each job in one clean place."},
  ]

  const howItWorkInfo = [
    {title:"Add an Application", subTitle:"Log the company, role, and date applied. Takes under 10 seconds."},
    {title:"Track Your Status", subTitle:"Update the status as you progress through screening, interviews, and offers."},
    {title:"Schedule Interviews", subTitle:"Add interview details and get reminders so you never miss a slot."},
    {title:"Land Your Offer", subTitle:"See your full journey at a glance and make the best decision for your career."}, 
  ]

  return (
    <>
      <main className=" bg-background-light">
        <nav className="flex items-center justify-between fixed top-0 left-0 right-0 h-15 px-8 border-b bg-surface border-border">
          <div class="h-full w-40 flex items-center justify-center">
            <img src={logoOrange} alt="" className="object-cover self-center" />
          </div>

          <div className="flex gap-4 text-text-secondary ">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div>
            
            <Link to="app" className=" inline-block bg-background-light text-text-primary font-medium px-4 py-2 rounded-xl border border-border-strong mr-2 hover:border-brand-hover hover:bg-brand-subtle active:scale-95">Log in</Link>
            <Link to="app" className=" inline-block bg-brand text-white font-medium px-4 py-2 rounded-xl hover:bg-brand-hover transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 ">Get Started</Link>
          </div>
        </nav>

        <section className=" bg-surface flex px-5 justify-center items-center h-screen min-h-200 border-b border-border-strong">
          <div className="w-120 max-w-md mr-20">
            <div className="my-2 animate-slide-in" >
              <span className=" p-1 px-4 border bg-brand-subtle text-brand rounded-2xl">Now in Public Alpha - free to use</span>
            </div>
            <h1 className="font-bold w-90 text-7xl my-4 animate-slide-in" style={{ animationDelay: "0.1s" }}>
              Track Every Step To Your  <span className="text-brand">Dream Offer</span>
            </h1>
            <h2 className="text-text-primary animate-slide-in" style={{ animationDelay: "0.1s" }}>
              OfferPath organizes your entire job search, applications, interviews, offers. So you can focus on landing the role, not managing spreadsheets.
            </h2>
            <button className="bg-brand text-white my-4 px-5 py-3 rounded-xl animate-slide-in" style={{ animationDelay: "0.5s" }}>Start for Free</button>
          </div>
          <div className="w-150 bg-surface p-4 border border-border rounded-2xl min-h-0 animate-float animate-slide-in">
            <div className="flex justify-between items-center mb-2 "> {/* Floating window */}
              <div className="flex gap-1 mx-3">
                <div className="w-2.25 h-2.25 bg-[#ff5f57] rounded-full"></div>
                <div className="w-2.25 h-2.25 bg-[#febc2e] rounded-full"></div>
                <div className="w-2.25 h-2.25 bg-[#28c840] rounded-full"></div>
              </div>
              <p className="text-text-secondary text-sm">OfferPath Dashboard</p>
              <div className="w-8.75  mx-3"></div>
            </div>
            <div className="flex gap-2">
              {miniStats.map(info=>(
                <div className="bg-surface-raised border border-border w-1/4 m-2 py-1 px-2 rounded-lg">
                  <p className="text-text-secondary text-[10px] ">{info.name.toUpperCase()}</p>
                  <span className="font-semibold">{info.value}</span>
                </div>
              ))}
            </div>
            <div className="m-2 bg-surface-raised border border-border rounded-lg">
              <p className="text-text-secondary text-sm px-2 pt-1">Activity - Last 6 Months</p>
              <div className="h-12 items-baseline flex gap-2 px-2">
                {last6Month.map((_,i)=>(
                  <div className="bg-border grow border border-border rounded-md" style={{height:`${graphH[i]}%`}}></div>
                ))}
              </div>
              <div className="flex gap-2 px-2">
                {last6Month.map((_,i)=>(
                  <div className="grow text-sm text-text-muted text-center">{last6Month[i].slice(0,3)}</div>
                ))}
              </div>
              
            </div>
            <div className="mini-jobs">
                <div className="bg-surface-raised flex items-center justify-between border border-border rounded-lg px-3 py-1 m-2">
                  <div className="flex items-center">
                    <div className="w-5 mr-2"><img src={urlToLogoLink("microsoft.com")} alt="" /></div>
                    <div className="flex flex-col">
                      <div className="text-xs text-text-secondary font-semibold">Microsoft</div>
                      <div className="text-xs text-text-muted">Software Engineer</div>
                    </div>
                  </div>
                  <span className="text-status-interview bg-status-interview-bg font-semibold text-xs py-1 px-2 rounded-2xl">Interview</span>
                </div>
                <div className="bg-surface-raised flex items-center justify-between border border-border rounded-lg px-3 py-1 m-2">
                  <div className="flex items-center">
                    <div className="w-5 mr-2"><img src={urlToLogoLink("stripe.com")} alt="" /></div>
                    <div className="flex flex-col">
                      <div className="text-xs text-text-secondary font-semibold">Stripe</div>
                      <div className="text-xs text-text-muted">Product Engineer</div>
                    </div>
                  </div>
                  <span className="text-status-offer bg-status-offer-bg font-semibold text-xs py-1 px-2 rounded-2xl">Offer</span>
                </div>
                <div className="bg-surface-raised flex items-center justify-between border border-border rounded-lg px-3 py-1 m-2">
                  <div className="flex items-center">
                    <div className="w-5 mr-2"><img src={urlToLogoLink("google.com")} alt="" /></div>
                    <div className="flex flex-col">
                      <div className="text-xs text-text-secondary font-semibold">Google</div>
                      <div className="text-xs text-text-muted">Design Engineer</div>
                    </div>
                  </div>
                  <span className="text-status-applied bg-status-applied-bg font-semibold text-xs py-1 px-2 rounded-2xl">Applied</span>
                </div>
              </div>
          </div>
        </section>

        <section className="flex items-center px-90 py-25 bg-background border-b border-border-strong" id="features">
          <div className="flex flex-col">
            <div className="my-2  max-w-250">
              <span className=" p-1 px-4 border bg-brand-subtle text-brand rounded-2xl">Features</span>
              <h2 className="font-bold w-130 text-5xl my-4">
                Everything you need to land your next offer
              </h2>
              <p className="w-120 text-text-secondary">Stop losing track of applications in your inbox. OfferPath gives you a single, organized workspace for your entire job search.</p>
            </div> 
            <div className="grid grid-cols-3 gap-5 py-8 ">
                {featuresCard.map(info=>(
                  <div className="border border-border-strong px-5 py-10 rounded-2xl">
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    <p className="text-sm">{info.subTitle}</p>
                  </div>
                ))}
            </div>

          </div>
          
        </section>

        <section className="flex bg-surface items-center px-70 py-25 border-b border-border-strong" id="how-it-works">
          <div className="flex flex-col w-full">
            <div className="my-2  max-w-250">
              <span className=" p-1 px-4 border bg-brand-subtle text-brand rounded-2xl">How it works</span>
              <h2 className="font-bold w-150 text-5xl my-4">
                From application to offer in four simple steps
              </h2>
              <p className="w-120 text-text-secondary">OfferPath is designed to be frictionless. Log an application in seconds, not minutes</p>
            </div> 
            <div className="w-full items-baseline flex gap-2 px-2 mt-20">
                {howItWorkInfo.map((_,i)=>(
                  <div className="flex grow items-center justify-center  ">
                    <p className="flex items-center justify-center text-2xl font-semibold  border border-border-strong w-11 h-11 text-brand rounded-full">{i+1}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 px-2 w-full mt-5">
                {howItWorkInfo.map((info,i)=>(
                  <div className="grow text-center">
                    <p className="mb-2">{info.title}</p>
                    <p className="text-sm text-text-muted">{info.subTitle}</p>
                  </div>
                ))}
              </div>
          </div>
        </section>

        <section className="flex justify-center items-center px-90 py-25 bg-background border-b border-border-strong" id="pricing">
          <div className="flex flex-col items-center">
            <div className="my-2  max-w-250">
              <span className=" p-1 px-4 border bg-brand-subtle text-brand rounded-2xl">Pricing</span>
              <h2 className="font-bold w-130 text-5xl my-4">
                Simple, honest pricing
              </h2>
              <p className="w-120 text-text-secondary">Start free. Upgrade when you're ready. No hidden fees.</p>
            </div> 

            <div className="flex items-center justify-center mt-8"> 
              <div className="flex flex-col border border-border-strong py-5 rounded-2xl p-5 ">
                <h2 className="text-3xl font-bold mb-5">Free</h2>
                <h3 className="text-4xl font-bold mb-3">$0 <span className="text-xl font-medium text-text-secondary">/forever</span></h3>
                <p className="mb-10">Everything you need to get started with your job search</p>
                <ul class="space-y-2">
                  <li class="flex items-center gap-2">
                    <span class="text-green-500">✓</span>
                    Unlimited applications
                  </li>

                  <li class="flex items-center gap-2">
                    <span class="text-green-500">✓</span>
                    Open source
                  </li>

                  <li class="flex items-center gap-2">
                    <span class="text-green-500">✓</span>
                    Status tracking
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-green-500">✓</span>
                    Interview scheduler
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-green-500">✓</span>
                    Progress dashboard
                  </li>
                </ul>
                <Link to="app" className="inline-block self-center w-[90%] text-center bg-surface py-2 mt-8 border border-border-strong rounded-lg hover:bg-brand-subtle hover:border-brand">Get Started</Link>
              </div>
              

            </div>

          </div> 
        </section>
      </main>

      <footer className="px-16 pt-10 bg-surface">
        <div className="flex justify-between border-b border-border pb-6">
          <div className="w-60">
            <img src={logoOrange} alt="logo" className="h-12"/>
            <p className="text-sm text-text-secondary">Your organized path from first application to final offer.</p>
          </div>
          <div className="flex w-200">
            <div className="flex flex-col gap-4 text-text-secondary w-1/3 ">
              <h3 className="text-text-primary font-semibold">Products</h3>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="flex flex-col gap-4 text-text-secondary w-1/3 ">
              <h3 className="text-text-primary font-semibold">Contacts</h3>
              <a href="https://x.com/Shashwat3264" target="_blank">X (Twitter)</a>
              <a href="https://github.com/Shashwat64" target="_blank">Github</a>
            </div>
            <div className="flex flex-col gap-4 text-text-secondary w-1/3 ">
              <h3 className="text-text-primary font-semibold">Products</h3>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href="#pricing">Pricing</a>
            </div>
          </div>
        </div>
        <div className="flex justify-between py-4">
          <p className="text-text-muted text-sm">© {new Date().getFullYear()}  All rights reserved.</p>
          <p className="text-text-muted text-sm">Built with ♥ for job seekers everywhere</p>
        </div>          
      </footer>
    </>
  )
}