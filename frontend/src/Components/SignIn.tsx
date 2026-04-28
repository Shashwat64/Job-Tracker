import { useState } from 'react'
import { Link, useSearchParams, useLocation, useNavigate, redirect} from 'react-router-dom'

import logoOrange from '../assets/logoOrange.png'

import { isSignedIn, signIn } from '../api/users'

export async function loader() {
  const res = await isSignedIn()

  if (res) {
    console.log("inside loader of signin")
    return redirect('/app')
  }

  return null 
}


export default function SignIn(){

  let [signInFailed, setSignInFailed] = useState(false);
  const location = useLocation()
  const state = location.state

  const navigate = useNavigate()

  const displayWarning = state?.signInRequired || false

  async function handleSumbit(e){
    e.preventDefault()

    const formData = new FormData(e.target)

    const email = formData.get("email")
    const password = formData.get("password")


    console.log(email)
    console.log(password)


    const res = await signIn({email, password})

    if(res){
      navigate('/app')
    }else{
      setSignInFailed(true);
    }
    console.log("signInFailed:", typeof signInFailed);
    console.log(displayWarning || signInFailed);
  }

  return (
    <main className='min-h-screen bg-background flex items-center justify-center select-none'>
      <nav className="flex items-center justify-between fixed top-0 left-0 right-0 h-16 px-10 border-b bg-surface border-border z-10">
          <div className="h-full w-40 flex items-center justify-center cursor-pointer" 
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
          >
            <img src={logoOrange} alt="logo"  className="object-cover self-center mt-2 mr-px"/>
          </div>
        </nav>

      <div className="bg-surface flex flex-col h-130 justify-between rounded-2xl border border-slate-200 p-8 w-full max-w-md">
        <div>
          <h1 className='text-text-secondary mb-5'>Signin Page</h1>
          <h2 className='font-semibold text-lg'>Welcome Back</h2>
          <p className='text-sm font-light mb-5'>Sign in to continue where you left off.</p>
        </div>

        {(displayWarning || signInFailed) && (
          <p className="mb-5 text-center text-brand bg-brand-subtle py-2">
            {signInFailed ? "Email or password invaild" : "Log in required"}
          </p>
        )}

        <form onSubmit={handleSumbit}>
          <label className='w-full flex flex-col'>
            Email Address
            <input 
              className='p-2 mt-1 mb-5 border border-border rounded-lg' 
              type="text" 
              placeholder='Enter your email'
              name="email" 
            />
          </label>

          <label className='w-full flex flex-col'>
            Password
            <input 
              className='p-2 mt-1 mb-5 border border-border rounded-lg' 
              type="password" 
              placeholder='Enter your password'
              name="password"
            />
          </label>

          <button className='block mx-auto mb-5 py-2 bg-brand text-surface w-11/12 self-center rounded-lg'>Sign in</button>

          <p className='text-center'>Don't have an account?<Link to="../signup" className='text-brand cursor-pointer ml-2'>Sign Up</Link> </p>
        </form>
      </div>
    </main>
  )
}