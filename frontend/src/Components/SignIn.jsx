import { Link, useSearchParams, useLocation} from 'react-router-dom'

import logoOrange from '../assets/logoOrange.png'

export default function SignIn(){

  const location = useLocation()
  const state = location.state


  const displayWarning = state?.loginRequired || false

  return (
    <main className='min-h-screen bg-background flex items-center justify-center'>
      <div className="bg-surface rounded-2xl border border-slate-200 p-8 w-full max-w-md">
        <h1 className='text-text-secondary mb-5'>Login Page</h1>
        <h2 className='font-semibold text-lg'>Welcome Back</h2>
        <p className='text-sm font-light mb-5'>Sign in to continue where you left off.</p>

        <p className={`mb-5 text-center text-brand bg-brand-subtle py-2 ${!displayWarning && 'invisible'}`}>Login required</p>

        <form action="">
          <label className='w-full flex flex-col'>
            Email Address
            <input className='p-2 mt-1 mb-5 border border-border rounded-lg' type="text" placeholder='Enter your email' />
          </label>

          <label className='w-full flex flex-col'>
            Password
            <input className='p-2 mt-1 mb-5 border border-border rounded-lg' type="text" placeholder='Enter your password' />
          </label>

          <button className='block mx-auto mb-5 py-2 bg-brand text-surface w-11/12 self-center rounded-lg'>Sign in</button>

          <p className='text-center'>Don't have an account?<Link to="../signup" className='text-brand cursor-pointer'>Sign Up</Link> </p>
        </form>
      </div>
    </main>
  )
}