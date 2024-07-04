import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'><h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
     <form className='flex flex-col gap-4'>
      <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg'></input>
      <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg'></input>
      <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg'></input>

      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
     </form>
    
    <div>
      <p>have an account </p>
      <Link to="/sign-in">
      <span className='text-blue-500'>Sign In</span>
      </Link>
    </div>
    
    
    
    </div>
  )
}
