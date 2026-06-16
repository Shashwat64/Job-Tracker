import { useContext, useRef } from "react"
import { Link, useNavigate } from 'react-router-dom'

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

  const miniStats = [{name:"applied", value:20},{name:"pending", value:8},{name:"interiew", value:4},{name:"offers", value:2}]

  const now = new Date()
  const last6Month = getLast6Month(now.getMonth())

  const graphH = [40, 50, 70, 80, 40, 30]

  const navigate = useNavigate()

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
      <main className=" bg-background-light w-full overflow-x-auto">
        <nav className="flex items-center justify-between fixed top-0 left-0 right-0 h-16 px-2  border-b bg-surface border-border z-10 lg:px-10">
          <div className="absolute -bottom-6 left-0 right-0 bg-orange-100 text-orange-900 border border-orange-200 text-center text-sm py-1">
            First load may take up to 1 minute while the server wakes up.
          </div>
          <div className="h-full w-40 flex items-center justify-center" 
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
          >
            <img src={logoOrange} alt="logo"  className="object-cover self-center mt-2 mr-px"/>
          </div>

          <div className="gap-4 text-text-secondary hidden md:flex">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div>
            
            <Link to="signin" className="inline-block bg-background-light text-text-primary mr-1 px-4 py-2 rounded-xl border border-border-strong lg:mr-2 hover:border-brand-hover hover:bg-brand-subtle active:scale-95 font-medium">Sign in</Link>
            <Link to="app" className=" inline-block bg-brand text-white font-medium px-4 py-2 rounded-xl hover:bg-brand-hover transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 ">Get Started</Link>
          </div>
        </nav>

        <section className=" bg-surface flex mt-16 px-5 py-5 justify-center items-center  min-h-200 border-b border-border-strong w-full flex-col lg:flex-row lg:h-screen md:px-20">
          <div className="w-full px-5 max-w-100 mr-5">
            <div className="my-2 animate-slide-in" >
              <span className=" p-1 px-4 border bg-brand-subtle text-brand rounded-2xl">Now in Public Alpha - free to use</span>
            </div>
            <h1 className="font-bold w-full text-3xl my-4 animate-slide-in lg:w-90 lg:text-7xl" style={{ animationDelay: "0.1s" }}>
              Track Every Step To Your  <span className="text-brand">Dream Offer</span>
            </h1>
            <h2 className="text-text-primary animate-slide-in" style={{ animationDelay: "0.1s" }}>
              OfferPath organizes your entire job search, applications, interviews, offers. So you can focus on landing the role, not managing spreadsheets.
            </h2>
            <Link to="/signin" className="bg-brand inline-block text-white my-4 px-5 py-3 rounded-xl animate-slide-in" style={{ animationDelay: "0.5s" }}>Start for Free</Link>
          </div>
          <div className="w-full max-w-150 bg-surface p-4 border border-border rounded-2xl min-h-0 animate-float animate-slide-in">
            <div className="flex justify-between items-center mb-2 "> {/* Floating window */}
              <div className="flex gap-1 mx-3">
                <div className="w-2.25 h-2.25 bg-[#ff5f57] rounded-full"></div>
                <div className="w-2.25 h-2.25 bg-[#febc2e] rounded-full"></div>
                <div className="w-2.25 h-2.25 bg-[#28c840] rounded-full"></div>
              </div>
              <p className="text-text-secondary text-sm">OfferPath Dashboard</p>
              <div className="w-8.75  mx-3"></div>
            </div>
            <div className="flex md:gap-2 w-full">
              {miniStats.map((info, i)=>(
                <div key={i} className="bg-surface-raised border border-border w-1/4 m-2 py-1 px-2 rounded-lg">
                  <p className="text-text-secondary text-[10px] ">{info.name.toUpperCase()}</p>
                  <span className="font-semibold">{info.value}</span>
                </div>
              ))}
            </div>
            <div className="m-2 bg-surface-raised border border-border rounded-lg">
              <p className="text-text-secondary text-sm px-2 pt-1">Activity - Last 6 Months</p>
              <div className="h-12 items-baseline flex gap-2 px-2">
                {last6Month.map((_,i)=>(
                  <div key={i} className="bg-border grow border border-border rounded-md" style={{height:`${graphH[i]}%`}}></div>
                ))}
              </div>
              <div className="flex gap-2 px-2">
                {last6Month.map((_,i)=>(
                  last6Month[i] && 
                  <div key={i} className="grow text-sm text-text-muted text-center">{last6Month[i].slice(0,3)}</div>
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

        <section className="flex items-center justify-center w-full px-10 py-25 bg-background border-b border-border-strong" id="features">
          <div className="flex flex-col w-full max-w-250">
            <div className="my-2 max-w-250 animate-slide-in">
              <span className=" p-1 px-4 border bg-brand-subtle text-brand rounded-2xl">Features</span>
              <h2 className="font-bold w-full max-w-130 text-5xl my-4">
                Everything you need to land your next offer
              </h2>
              <p className="max-w-120 text-text-secondary w-full">Stop losing track of applications in your inbox. OfferPath gives you a single, organized workspace for your entire job search.</p>
            </div> 
            <div className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-8">
                {featuresCard.map((info, i)=>(
                  <div key={i} className="max-w-full border border-border-strong px-5 py-10 rounded-2xl">
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    <p className="text-sm wrap-break-word leading-relaxed">{info.subTitle}</p>
                  </div>
                ))}
            </div>

          </div>
          
        </section>

        <section className="flex bg-surface justify-center items-center px-15 py-25 border-b border-border-strong w-full" id="how-it-works">
          <div className="flex flex-col w-full max-w-250">
            <div className="my-2 w-full">
              <span className=" p-1 px-4 border bg-brand-subtle text-brand rounded-2xl">How it works</span>
              <h2 className="w-full font-bold max-w-150 text-5xl my-4">
                From application to offer in four simple steps
              </h2>
              <p className="max-w-120 w-full text-text-secondary ">OfferPath is designed to be frictionless. Log an application in seconds, not minutes</p>
            </div> 
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {howItWorkInfo.map((info, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center px-2"
                >
                  {/* Number */}
                  <p className="flex items-center justify-center text-lg md:text-2xl font-semibold border border-border-strong w-9 h-9 md:w-11 md:h-11 text-brand rounded-full mb-2">
                    {i + 1}
                  </p>

                  {/* Text */}
                  <p className="mb-1 text-sm md:text-base">{info.title}</p>
                  <p className="text-xs md:text-sm text-text-muted">
                    {info.subTitle}
                  </p>
                </div>
              ))}
              </div>
          </div>
        </section>

        <section className="w-full flex justify-center items-center px-10 py-25 bg-background border-b border-border-strong" id="pricing">
          <div className="flex w-full flex-col items-center">
            <div className="my-2 w-full max-w-250">
              <span className="w-full p-1 px-4 border bg-brand-subtle text-brand rounded-2xl">Pricing</span>
              <h2 className="font-bold w-full max-w-130 text-5xl my-4">
                Simple, honest pricing
              </h2>
              <p className="w-full max-w-120 text-text-secondary">Start free. Upgrade when you're ready. No hidden fees.</p>
            </div> 

            <div className="flex items-center justify-center mt-8"> 
              <div className="flex flex-col border border-border-strong py-5 rounded-2xl p-5 ">
                <h2 className="text-3xl font-bold mb-5">Free</h2>
                <h3 className="text-4xl font-bold mb-3">$0 <span className="text-xl font-medium text-text-secondary">/forever</span></h3>
                <p className="mb-10">Everything you need to get started with your job search</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Unlimited applications
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Open source
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Status tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Interview scheduler
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Progress dashboard
                  </li>
                </ul>
                <Link to="app" className="inline-block self-center w-[90%] text-center bg-surface py-2 mt-8 border border-border-strong rounded-lg hover:bg-brand-subtle hover:border-brand">Get Started</Link>
              </div>
              

            </div>

          </div> 
        </section>
      </main>

      <footer className="pt-10 px-2 bg-surface">
        <div className="flex justify-around gap-10 border-b border-border pb-6 ">
          <div className="w-1/3">
            <img src={logoOrange} alt="logo" className="h-12"/>
            <p className="text-sm text-text-secondary hidden sm:block">Your organized path from first application to final offer.</p>
          </div>
          <div className="flex w-2/3 max-w-120 text-xs leading-[0.7] md:text-base md:leading-normal">
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
        <div className="flex justify-between py-4 px-2 gap-1">
          <p className="text-text-muted text-xs">© {new Date().getFullYear()}  All rights reserved.</p>
          <p className="text-text-muted text-xs">Built with ♥ for job seekers everywhere</p>
        </div>          
      </footer>
    </>
  )
}